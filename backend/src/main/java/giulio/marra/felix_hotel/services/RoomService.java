package giulio.marra.felix_hotel.services;

import giulio.marra.felix_hotel.dto.facility.FacilityResponseDto;
import giulio.marra.felix_hotel.dto.room.NewRoomRequiredDto;
import giulio.marra.felix_hotel.dto.room.RoomResponseDto;
import giulio.marra.felix_hotel.dto.room.RoomSearchFilterDto;
import giulio.marra.felix_hotel.entities.Room;
import giulio.marra.felix_hotel.exceptions.BadRequestException;
import giulio.marra.felix_hotel.exceptions.NotFoundException;
import giulio.marra.felix_hotel.repository.BookingItemRepository;
import giulio.marra.felix_hotel.repository.RoomRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class RoomService {
    private final RoomRepository roomRepository;
    private final CloudinaryService cloudinaryService;
    private final FacilityService facilityService;
    private final BookingItemRepository bookingItemRepository;

    public RoomService(RoomRepository roomRepository,
                       CloudinaryService cloudinaryService,
                       FacilityService facilityService,
                       BookingItemRepository bookingItemRepository) {
        this.roomRepository = roomRepository;
        this.cloudinaryService = cloudinaryService;
        this.facilityService = facilityService;
        this.bookingItemRepository = bookingItemRepository;
    }

    private RoomResponseDto mapToResponseDto(Room room, LocalDate checkIn, LocalDate checkOut) {
        int availableNow = room.getTotalUnits();

        if (checkIn != null && checkOut != null) {
            Integer occupied = bookingItemRepository.countConfirmedOccupiedUnits(room.getId(), checkIn, checkOut);
            availableNow = room.getTotalUnits() - (occupied != null ? occupied : 0);
        }

        return new RoomResponseDto(
                room.getId(),
                room.getNameRoom(),
                room.getMaxOccupancy(),
                room.getTotalUnits(),
                Math.max(0, availableNow),
                room.getDescription(),
                room.getImageUrls(),
                room.getPriceForNight(),
                room.getDiscountPercentage(),
                room.getAvailable(),
                room.getRoomType(),
                room.getFacilities().stream()
                        .map(f -> new FacilityResponseDto(f.getId(), f.getName()))
                        .toList()
        );
    }


    public List<RoomResponseDto> findAvailableRooms(RoomSearchFilterDto filter) {
        if (filter.checkIn() == null || filter.checkOut() == null) {
            throw new BadRequestException("Seleziona le date del soggiorno.");
        }

        if (filter.checkIn().isBefore(LocalDate.now())) {
            throw new BadRequestException("La data di check-in non può essere precedente a oggi.");
        }

        if (!filter.checkOut().isAfter(filter.checkIn())) {
            throw new BadRequestException("La data di check-out deve essere successiva a quella di check-in.");
        }

        return roomRepository.findAvailableRooms(
                        filter.checkIn(),
                        filter.checkOut(),
                        filter.roomType(),
                        filter.guests()
                ).stream()
                .map(room -> mapToResponseDto(room, filter.checkIn(), filter.checkOut()))
                .toList();
    }


    public List<RoomResponseDto> findAllRooms() {
        return roomRepository.findAll().stream()
                .map(room -> mapToResponseDto(room, null, null))
                .toList();
    }

    public RoomResponseDto findRoomById(Long id) {
        Room room = findById(id);
        return mapToResponseDto(room, null, null);
    }

    public Room findById(Long id) {
        return roomRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Stanza non trovata"));
    }

    @Transactional
    public RoomResponseDto saveNewRoom(NewRoomRequiredDto body, List<MultipartFile> images) {
        List<String> imageUrls = new ArrayList<>();
        try {
            if (images != null) {
                for (MultipartFile file : images) {
                    imageUrls.add(cloudinaryService.uploadImage(file));
                }
            }
        } catch (IOException e) {
            throw new BadRequestException("Errore upload immagini");
        }

        Room room = new Room();
        room.setNameRoom(body.nameRoom());
        room.setMaxOccupancy(body.maxOccupancy());
        room.setTotalUnits(body.totalUnits());
        room.setDescription(body.description());
        room.setPriceForNight(body.priceForNight());
        room.setDiscountPercentage(body.discountPercentage());
        room.setAvailable(body.isAvailable());
        room.setRoomType(body.roomType());

        room.setImageUrls(imageUrls);
        room.setFacilities(body.facilitiesIds().stream()
                .map(facilityService::findEntityById)
                .toList());

        return mapToResponseDto(roomRepository.save(room), null, null);
    }

    @Transactional
    public RoomResponseDto updateRoom(Long id, NewRoomRequiredDto body) {
        Room existing = findById(id);

        existing.setNameRoom(body.nameRoom());
        existing.setMaxOccupancy(body.maxOccupancy());
        existing.setTotalUnits(body.totalUnits());
        existing.setDescription(body.description());
        existing.setPriceForNight(body.priceForNight());
        existing.setDiscountPercentage(body.discountPercentage());
        existing.setAvailable(body.isAvailable());
        existing.setRoomType(body.roomType());

        existing.setFacilities(body.facilitiesIds().stream()
                .map(facilityService::findEntityById)
                .toList());

        return mapToResponseDto(roomRepository.save(existing), null, null);
    }

    @Transactional
    public String deleteRoom(Long id) {
        Room room = findById(id);
        roomRepository.delete(room);
        return "Eliminata";
    }
}