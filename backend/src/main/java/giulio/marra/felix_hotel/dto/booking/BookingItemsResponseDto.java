package giulio.marra.felix_hotel.dto.booking;


import java.time.LocalDate;

public record BookingItemsResponseDto(
        Long id,
        BookingRoomResponseDto room,
        LocalDate checkInDate,
        LocalDate checkOutDate,
        Integer numberOfGuests,
        Double priceAtBooking
) {
}
