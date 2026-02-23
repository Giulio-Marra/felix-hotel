package giulio.marra.felix_hotel.controller;

import giulio.marra.felix_hotel.dto.room.NewRoomRequiredDto;
import giulio.marra.felix_hotel.dto.room.RoomResponseDto;
import giulio.marra.felix_hotel.dto.room.RoomSearchFilterDto;
import giulio.marra.felix_hotel.services.RoomService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "http://localhost:5173")
public class RoomController {

    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    // --- PUBBLICO: Ricerca stanze con filtri (Date, Tipo, Ospiti) ---
    @GetMapping("/search")
    public List<RoomResponseDto> findAvailableRooms(@Valid RoomSearchFilterDto filter) {
        return roomService.findAvailableRooms(filter);
    }

    // --- PUBBLICO: Lista completa di tutte le stanze (Catalogo) ---
    @GetMapping
    public List<RoomResponseDto> getAllRooms() {
        return roomService.findAllRooms();
    }

    // --- PUBBLICO: Dettaglio singola stanza ---
    @GetMapping("/{id}")
    public RoomResponseDto getRoomById(@PathVariable Long id) {
        return roomService.findRoomById(id);
    }

    // --- ADMIN: Salvataggio nuova stanza con immagini ---
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    public RoomResponseDto saveRoom(
            @RequestPart("body") @Valid NewRoomRequiredDto body,
            @RequestPart(value = "images", required = false) List<MultipartFile> images) {
        return roomService.saveNewRoom(body, images);
    }

    // --- ADMIN: Aggiornamento stanza ---
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public RoomResponseDto updateRoom(
            @PathVariable Long id,
            @RequestBody @Valid NewRoomRequiredDto body) {
        return roomService.updateRoom(id, body);
    }

    // --- ADMIN: Eliminazione stanza ---
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public String deleteRoom(@PathVariable Long id) {
        return roomService.deleteRoom(id);
    }
}