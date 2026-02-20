package giulio.marra.felix_hotel.dto.booking;

public record BookingRoomResponseDto(
        String nameRoom,
        Integer maxOccupancy,
        Double priceForNight,
        Double discountPercentage
) {
}
