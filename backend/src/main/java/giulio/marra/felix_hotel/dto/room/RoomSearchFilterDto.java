package giulio.marra.felix_hotel.dto.room;

import giulio.marra.felix_hotel.enums.RoomType;

import java.time.LocalDate;

public record RoomSearchFilterDto(
        LocalDate checkIn,
        LocalDate checkOut,
        RoomType roomType,
        Integer guests
) {
}
