package giulio.marra.felix_hotel.dto.user;

import giulio.marra.felix_hotel.enums.Role;

public record UserResponseDto(
        Long id,
        String name,
        String surname,
        String email,
        String numTel,
        Role role
) {
}
