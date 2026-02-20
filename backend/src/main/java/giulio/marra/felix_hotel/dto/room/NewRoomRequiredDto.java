package giulio.marra.felix_hotel.dto.room;

import giulio.marra.felix_hotel.enums.RoomType;
import jakarta.validation.constraints.*;

import java.util.List;

public record NewRoomRequiredDto(
        @NotBlank(message = "Il nome della camera è obbligatorio")
        @Size(min = 3, max = 100, message = "Il nome deve avere tra 3 e 100 caratteri")
        String nameRoom,

        @NotNull(message = "L'occupazione massima è obbligatoria")
        @Min(value = 1, message = "La camera deve ospitare almeno una persona")
        Integer maxOccupancy,

        @NotNull(message = "Il nuimero massimo di quella stanza è obbligatoria")
        @Min(value = 1, message = "La camera deve essere alemno una")
        Integer totalUnits,

        @NotBlank(message = "La descrizione è obbligatoria")
        @Size(max = 1000, message = "La descrizione non può superare i 1000 caratteri")
        String description,

        @NotNull(message = "Il prezzo è obbligatorio")
        @Positive(message = "Il prezzo deve essere maggiore di zero")
        Double priceForNight,

        @Min(0) @Max(100)
        Double discountPercentage,

        @NotNull(message = "Specificare se la camera è disponibile")
        Boolean isAvailable,

        @NotNull(message = "Il tipo di camera è obbligatorio")
        RoomType roomType,

        @NotEmpty(message = "Inserire almeno un ID facility")
        List<Long> facilitiesIds
) {
}