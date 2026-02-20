package giulio.marra.felix_hotel.dto.booking;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record NewBookingItemRequiredDto(
        @NotNull(message = "L'ID della stanza è obbligatorio")
        Long roomId,

        @NotNull(message = "La data di check-in è obbligatoria")
        @FutureOrPresent(message = "Il check-in non può essere nel passato")
        LocalDate checkInDate,

        @NotNull(message = "La data di check-out è obbligatoria")
        @Future(message = "Il check-out deve essere nel futuro")
        LocalDate checkOutDate,

        @NotNull(message = "Il numero di ospiti è obbligatorio")
        @Min(value = 1, message = "Deve esserci almeno un ospite")
        Integer numberOfGuests,

        Integer quantity
) {
}