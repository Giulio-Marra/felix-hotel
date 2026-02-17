package giulio.marra.felix_hotel.dto.room;

import giulio.marra.felix_hotel.dto.facility.FacilityResponseDto;
import giulio.marra.felix_hotel.enums.RoomType;

import java.util.List;

public record RoomResponseDto(
        Long id,
        String nameRoom,
        Integer maxOccupancy,
        String description,
        List<String> imageUrls,
        Double priceForNight,
        Double discountPercentage,
        Boolean isAvailable,
        RoomType roomType,
        List<FacilityResponseDto> facilities
) {
}
