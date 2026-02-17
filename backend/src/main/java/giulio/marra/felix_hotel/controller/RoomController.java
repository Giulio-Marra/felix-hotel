package giulio.marra.felix_hotel.controller;

import giulio.marra.felix_hotel.dto.room.NewRoomRequiredDto;
import giulio.marra.felix_hotel.dto.room.RoomResponseDto;
import giulio.marra.felix_hotel.services.RoomService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@Validated
public class RoomController {

    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @ResponseStatus(HttpStatus.CREATED)
    public RoomResponseDto createRoom(
            @RequestPart("room") @Valid NewRoomRequiredDto body,
            @RequestPart("images") List<MultipartFile> images) {
        return roomService.saveNewRoom(body, images);
    }

    @GetMapping
    public List<RoomResponseDto> getAllRooms() {
        return roomService.findAllRooms();
    }

    @GetMapping("/{id}")
    public RoomResponseDto getRoomById(@PathVariable Long id) {
        return roomService.findRoomById(id);
    }

    @PutMapping("/{id}")
    public RoomResponseDto updateRoom(@PathVariable Long id, @RequestBody @Valid NewRoomRequiredDto body) {
        return roomService.updateRoom(id, body);
    }

    @DeleteMapping("/{id}")
    public String deleteRoom(@PathVariable Long id) {
        return roomService.deleteRoom(id);
    }
}