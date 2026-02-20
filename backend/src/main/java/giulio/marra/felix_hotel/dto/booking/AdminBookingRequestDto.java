package giulio.marra.felix_hotel.dto.booking;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AdminBookingRequestDto(
        @NotBlank(message = "L'email è obbligatoria")
        @Email(message = "Formato email non valido")
        String email,

        @NotBlank(message = "Il nome è obbligatorio")
        String name,

        @NotBlank(message = "Il numero di telefono è obbligatorio")
        String phone,

        @NotNull(message = "I dettagli della prenotazione sono obbligatori")
        @Valid
        NewBookingItemRequiredDto details
) {
}
