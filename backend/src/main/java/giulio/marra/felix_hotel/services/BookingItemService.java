package giulio.marra.felix_hotel.services;

import giulio.marra.felix_hotel.dto.booking.NewBookingItemRequiredDto;
import giulio.marra.felix_hotel.entities.Booking;
import giulio.marra.felix_hotel.entities.BookingItem;
import giulio.marra.felix_hotel.entities.Room;
import giulio.marra.felix_hotel.entities.User;
import giulio.marra.felix_hotel.exceptions.BadRequestException;
import giulio.marra.felix_hotel.exceptions.NotFoundException;
import giulio.marra.felix_hotel.repository.BookingItemRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import static java.time.temporal.ChronoUnit.DAYS;

@Service
public class BookingItemService {
    private final RoomService roomService;
    private final BookingItemRepository bookingItemRepository;
    private final BookingService bookingService;

    public BookingItemService(RoomService roomService, BookingItemRepository bookingItemRepository, BookingService bookingService) {
        this.roomService = roomService;
        this.bookingItemRepository = bookingItemRepository;
        this.bookingService = bookingService;
    }

    @Transactional
    public String addNewBookingItem(NewBookingItemRequiredDto body, User user) {
        Room room = roomService.findById(body.roomId());

        int quantity = (body.quantity() != null) ? body.quantity() : 1;

        if (body.numberOfGuests() > room.getMaxOccupancy()) {
            throw new BadRequestException("Il numero di ospiti (" + body.numberOfGuests() +
                    ") supera la capienza massima della stanza (" + room.getMaxOccupancy() + ")");
        }

        Integer occupiedUnits = bookingItemRepository.countConfirmedOccupiedUnits(
                body.roomId(), body.checkInDate(), body.checkOutDate()
        );

        if (occupiedUnits + quantity > room.getTotalUnits()) {
            throw new BadRequestException("Spiacenti, non ci sono abbastanza unità disponibili per la camera " +
                    room.getNameRoom() + ". Disponibili: " + (room.getTotalUnits() - occupiedUnits));
        }

        long nights = DAYS.between(body.checkInDate(), body.checkOutDate());
        if (nights <= 0) {
            throw new BadRequestException("La data di check-out deve essere successiva a quella di check-in.");
        }
        double pricePerRoom = room.getPriceForNight() * nights;

        Booking cart = bookingService.getOrCreateCurrentCartEntity(user);

        for (int i = 0; i < quantity; i++) {
            BookingItem newItem = new BookingItem();
            newItem.setBooking(cart);
            newItem.setRoom(room);
            newItem.setCheckInDate(body.checkInDate());
            newItem.setCheckOutDate(body.checkOutDate());
            newItem.setNumberOfGuests(body.numberOfGuests());
            newItem.setPriceAtBooking(pricePerRoom);

            bookingItemRepository.save(newItem);
            cart.getItems().add(newItem);
        }

        double totalAddition = pricePerRoom * quantity;
        cart.setTotalPrice(cart.getTotalPrice() + totalAddition);

        bookingService.saveBooking(cart);

        return quantity + "x " + room.getNameRoom() + " aggiunte al carrello con successo!";
    }

    @Transactional
    public String removeBookingItem(Long itemId, User user) {
        BookingItem item = bookingItemRepository.findByIdAndBookingUser(itemId, user)
                .orElseThrow(() -> new NotFoundException("Elemento del carrello non trovato o non appartenente all'utente"));

        Booking cart = item.getBooking();

        double updatedTotal = cart.getTotalPrice() - item.getPriceAtBooking();
        cart.setTotalPrice(Math.max(0, updatedTotal));


        bookingItemRepository.delete(item);
        bookingService.saveBooking(cart);

        return "Stanza rimossa dal carrello con successo!";
    }


}
