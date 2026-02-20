package giulio.marra.felix_hotel.dto.booking;

import giulio.marra.felix_hotel.enums.BookingStatus;

import java.time.LocalDate;
import java.util.List;

public record BookingResponseDto(
        BookingUserResponseDto user,
        LocalDate bookingDate,
        Double totalPrice,
        BookingStatus status,
        List<BookingItemsResponseDto> items
) {
}
