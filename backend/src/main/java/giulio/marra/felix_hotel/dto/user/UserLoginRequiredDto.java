package giulio.marra.felix_hotel.dto.user;

public record UserLoginRequiredDto(
        String email,
        String password
) {
}
