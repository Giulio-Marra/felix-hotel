package giulio.marra.felix_hotel.services;

import giulio.marra.felix_hotel.dto.facility.FacilityResponseDto;
import giulio.marra.felix_hotel.dto.room.NewRoomRequiredDto;
import giulio.marra.felix_hotel.dto.room.RoomResponseDto;
import giulio.marra.felix_hotel.entities.Facility;
import giulio.marra.felix_hotel.entities.Room;
import giulio.marra.felix_hotel.exceptions.BadRequestException;
import giulio.marra.felix_hotel.exceptions.NotFoundException;
import giulio.marra.felix_hotel.repository.RoomRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class RoomService {
    private final RoomRepository roomRepository;
    private final CloudinaryService cloudinaryService;
    private final FacilityService facilityService;

    public RoomService(RoomRepository roomRepository,
                       CloudinaryService cloudinaryService,
                       FacilityService facilityService) {
        this.roomRepository = roomRepository;
        this.cloudinaryService = cloudinaryService;
        this.facilityService = facilityService;
    }

    private RoomResponseDto mapToResponseDto(Room room) {
        return new RoomResponseDto(
                room.getId(),
                room.getNameRoom(),
                room.getMaxOccupancy(),
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

    @Transactional
    public RoomResponseDto saveNewRoom(NewRoomRequiredDto body, List<MultipartFile> images) {
        List<String> imageUrls = new ArrayList<>();

        try {
            if (images != null && !images.isEmpty()) {
                for (MultipartFile file : images) {
                    String url = cloudinaryService.uploadImage(file);
                    imageUrls.add(url);
                }
            }
        } catch (IOException e) {
            throw new BadRequestException("Errore critico durante l'upload delle immagini: " + e.getMessage());
        }


        List<Facility> facilities = body.facilitiesIds().stream()
                .map(facilityService::findEntityById)
                .toList();


        Room newRoom = new Room();
        newRoom.setNameRoom(body.nameRoom());
        newRoom.setMaxOccupancy(body.maxOccupancy());
        newRoom.setDescription(body.description());
        newRoom.setPriceForNight(body.priceForNight());
        newRoom.setDiscountPercentage(body.discountPercentage());
        newRoom.setAvailable(body.isAvailable());
        newRoom.setRoomType(body.roomType());
        newRoom.setImageUrls(imageUrls);
        newRoom.setFacilities(facilities);

        return mapToResponseDto(roomRepository.save(newRoom));
    }


    public List<RoomResponseDto> findAllRooms() {
        return roomRepository.findAll().stream()
                .map(this::mapToResponseDto)
                .toList();
    }


    public RoomResponseDto findRoomById(Long id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Stanza non trovata con ID: " + id));
        return mapToResponseDto(room);
    }


    @Transactional
    public String deleteRoom(Long id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Impossibile eliminare: Stanza non trovata"));

        if (room.getImageUrls() != null) {
            for (String url : room.getImageUrls()) {
                try {
                    cloudinaryService.deleteImage(url);
                } catch (IOException e) {
                    throw new BadRequestException("Errore durante la pulizia delle immagini su Cloudinary: " + e.getMessage());
                }
            }
        }

        roomRepository.delete(room);
        return "Stanza " + id + " e relative immagini eliminate correttamente.";
    }

    @Transactional
    public RoomResponseDto updateRoom(Long id, NewRoomRequiredDto body) {
        Room existingRoom = roomRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Stanza non trovata per l'aggiornamento"));

        List<Facility> facilities = body.facilitiesIds().stream()
                .map(facilityService::findEntityById)
                .toList();

        existingRoom.setNameRoom(body.nameRoom());
        existingRoom.setMaxOccupancy(body.maxOccupancy());
        existingRoom.setDescription(body.description());
        existingRoom.setPriceForNight(body.priceForNight());
        existingRoom.setDiscountPercentage(body.discountPercentage());
        existingRoom.setAvailable(body.isAvailable());
        existingRoom.setRoomType(body.roomType());
        existingRoom.setFacilities(facilities);

        return mapToResponseDto(roomRepository.save(existingRoom));
    }
}