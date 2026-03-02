package giulio.marra.felix_hotel.services;

import giulio.marra.felix_hotel.dto.booking.*;
import giulio.marra.felix_hotel.entities.Booking;
import giulio.marra.felix_hotel.entities.BookingItem;
import giulio.marra.felix_hotel.entities.Room;
import giulio.marra.felix_hotel.entities.User;
import giulio.marra.felix_hotel.enums.BookingStatus;
import giulio.marra.felix_hotel.enums.Role;
import giulio.marra.felix_hotel.exceptions.BadRequestException;
import giulio.marra.felix_hotel.exceptions.NotFoundException;
import giulio.marra.felix_hotel.repository.BookingItemRepository;
import giulio.marra.felix_hotel.repository.BookingRepository;
import giulio.marra.felix_hotel.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final RoomService roomService;
    private final BookingItemRepository bookingItemRepository;
    private final PasswordEncoder passwordEncoder;

    public BookingService(BookingRepository bookingRepository, UserRepository userRepository, RoomService roomService, BookingItemRepository bookingItemRepository, PasswordEncoder passwordEncoder) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.roomService = roomService;
        this.bookingItemRepository = bookingItemRepository;
        this.passwordEncoder = passwordEncoder;
    }

    private BookingResponseDto mapToResponseDto(Booking booking) {

        BookingUserResponseDto userDto = new BookingUserResponseDto(
                booking.getUser().getEmail(),
                booking.getUser().getNumTel()
        );

        List<BookingItemsResponseDto> itemDtos = booking.getItems().stream()
                .map(item -> new BookingItemsResponseDto(
                        item.getId(),
                        new BookingRoomResponseDto(
                                item.getRoom().getNameRoom(),
                                item.getRoom().getMaxOccupancy(),
                                item.getRoom().getPriceForNight(),
                                item.getRoom().getDiscountPercentage()
                        ),
                        item.getCheckInDate(),
                        item.getCheckOutDate(),
                        item.getNumberOfGuests(),
                        item.getPriceAtBooking()
                )).toList();

        return new BookingResponseDto(
                userDto,
                booking.getBookingDate(),
                booking.getTotalPrice(),
                booking.getStatus(),
                itemDtos
        );
    }

    public Booking getOrCreateCurrentCartEntity(User user) {
        return bookingRepository.findByUserAndStatus(user, BookingStatus.DRAFT)
                .orElseGet(() -> {
                    Booking newCart = new Booking();
                    newCart.setUser(user);
                    newCart.setStatus(BookingStatus.DRAFT);
                    newCart.setBookingDate(LocalDate.now());
                    newCart.setTotalPrice(0.0);
                    return bookingRepository.save(newCart);
                });
    }

    public void saveBooking(Booking booking) {
        bookingRepository.save(booking);
    }

    public BookingResponseDto getUserCart(User user) {
        Booking cart = getOrCreateCurrentCartEntity(user);
        return mapToResponseDto(cart);
    }

    @Transactional
    public String clearCart(User user) {
        Booking cart = getOrCreateCurrentCartEntity(user);
        cart.getItems().clear();
        cart.setTotalPrice(0.0);
        bookingRepository.save(cart);
        return "Carrello svuotato con successo";
    }

    public List<BookingResponseDto> getAllBookings() {
        return bookingRepository.findAll().stream()
                .map(this::mapToResponseDto)
                .toList();
    }

    public BookingResponseDto getBookingById(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new NotFoundException("Prenotazione con ID " + bookingId + " non trovata"));
        return mapToResponseDto(booking);
    }

    @Transactional
    public BookingResponseDto updateStatus(Long id, BookingStatus newStatus) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Prenotazione non trovata"));

        booking.setStatus(newStatus);
        return mapToResponseDto(bookingRepository.save(booking));
    }

    public List<BookingResponseDto> getMyBookings(User user) {
        return bookingRepository.findByUser(user).stream()
                .map(this::mapToResponseDto)
                .toList();
    }

    public List<BookingResponseDto> searchBookingsAdmin(String email, BookingStatus status, LocalDate start, LocalDate end) {
        return bookingRepository.searchBookingsAdmin(email, status, start, end)
                .stream()
                .map(this::mapToResponseDto)
                .toList();
    }

    @Transactional
    public BookingResponseDto createBookingForNewOrExistingUser(AdminBookingRequestDto body) {
        User user = userRepository.findByEmail(body.email()).orElseGet(() -> {
            User newUser = new User();
            newUser.setEmail(body.email());
            newUser.setName(body.name());
            newUser.setNumTel(body.phone());
            newUser.setRole(Role.USER);
            newUser.setPassword(passwordEncoder.encode("PasswordProvisoria123!"));
            return userRepository.save(newUser);
        });

        Room room = roomService.findById(body.details().roomId());
        int quantity = (body.details().quantity() != null) ? body.details().quantity() : 1;

        Integer occupiedUnits = bookingItemRepository.countConfirmedOccupiedUnits(
                body.details().roomId(), body.details().checkInDate(), body.details().checkOutDate()
        );

        if (occupiedUnits + quantity > room.getTotalUnits()) {
            throw new BadRequestException("Disponibilità insufficiente. Libere: " + (room.getTotalUnits() - occupiedUnits));
        }

        long nights = java.time.temporal.ChronoUnit.DAYS.between(body.details().checkInDate(), body.details().checkOutDate());
        double pricePerRoom = room.getPriceForNight() * nights;
        double totalPrice = pricePerRoom * quantity;

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setStatus(BookingStatus.CONFIRMED);
        booking.setBookingDate(LocalDate.now());
        booking.setTotalPrice(totalPrice);
        Booking savedBooking = bookingRepository.save(booking);

        for (int i = 0; i < quantity; i++) {
            BookingItem item = new BookingItem();
            item.setBooking(savedBooking);
            item.setRoom(room);
            item.setCheckInDate(body.details().checkInDate());
            item.setCheckOutDate(body.details().checkOutDate());
            item.setNumberOfGuests(body.details().numberOfGuests());
            item.setPriceAtBooking(pricePerRoom);
            bookingItemRepository.save(item);
            savedBooking.getItems().add(item);
        }

        return mapToResponseDto(savedBooking);
    }


}
