package giulio.marra.felix_hotel.dto.booking;


import java.time.LocalDate;

public record BookingItemsResponseDto(
        BookingRoomResponseDto room,
        LocalDate checkInDate,
        LocalDate checkOutDate,
        Integer numberOfGuests,
        Double priceAtBooking
) {
}
