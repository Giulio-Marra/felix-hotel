package giulio.marra.felix_hotel.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record NewUserRequiredDto(
        @NotBlank(message = "Il nome è obbligatorio")
        @Size(min = 5, message = "Il nome deve avere almeno 2 caratteri")
        String name,

        @NotBlank(message = "Il cognome è obbligatorio")
        String surname,

        @NotBlank(message = "L'email è obbligatoria")
        @Email(message = "Inserisci un indirizzo email valido")
        String email,

        @NotBlank(message = "La password è obbligatoria")
        @Size(min = 8, message = "La password deve avere almeno 8 caratteri")
        @Pattern(
                regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\\S+$).{8,}$",
                message = "La password deve contenere almeno una maiuscola, una minuscola, un numero e un carattere speciale"
        )
        String password,

        @NotBlank(message = "Il numero di telefono è obbligatorio")
        @Pattern(regexp = "^[0-9]{12}$", message = "Il numero di telefono deve essere di 12 cifre")
        String numTel
) {
}