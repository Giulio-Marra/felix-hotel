package giulio.marra.felix_hotel.services;

import giulio.marra.felix_hotel.dto.user.UserResponseDto;
import giulio.marra.felix_hotel.entities.User;
import giulio.marra.felix_hotel.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserResponseDto mapToDto(User user) {
        return new UserResponseDto(
                user.getId(),
                user.getName(),
                user.getSurname(),
                user.getEmail(),
                user.getNumTel(),
                user.getRole()
        );
    }

    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utente con id " + id + " non trovato"));
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utente con email " + email + " non trovato"));
    }

    public UserResponseDto findByMe(User user) {
        return this.mapToDto(user);
    }

}
