package giulio.marra.felix_hotel.services;

import giulio.marra.felix_hotel.dto.user.NewUserRequiredDto;
import giulio.marra.felix_hotel.dto.user.UserResponseDto;
import giulio.marra.felix_hotel.entities.User;
import giulio.marra.felix_hotel.enums.Role;
import giulio.marra.felix_hotel.exceptions.AlreadyExistException;
import giulio.marra.felix_hotel.exceptions.BadRequestException;
import giulio.marra.felix_hotel.repository.UserRepository;
import giulio.marra.felix_hotel.security.JWTTools;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserService userService;
    private final UserRepository userRepository;
    private final JWTTools jwtTools;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserService userService, UserRepository userRepository, JWTTools jwtTools, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.jwtTools = jwtTools;
        this.passwordEncoder = passwordEncoder;
    }

    public String authenticateUserAndGenerateToken(String email, String password) {
        User user = userService.findByEmail(email);

        if (passwordEncoder.matches(password, user.getPassword())) {
            return jwtTools.createToken(user);
        } else {
            throw new BadRequestException("Credenziali non valide! Riprova.");
        }
    }

    public UserResponseDto save(NewUserRequiredDto body) {
        if (userRepository.existsByEmail(body.email())) {
            throw new AlreadyExistException("L'email " + body.email() + " è già registrata!");
        }

        User newUser = new User();
        newUser.setName(body.name());
        newUser.setSurname(body.surname());
        newUser.setEmail(body.email());
        newUser.setNumTel(body.numTel());
        newUser.setRole(Role.USER);
        newUser.setPassword(passwordEncoder.encode(body.password()));

        User savedUser = userRepository.save(newUser);

        return new UserResponseDto(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getSurname(),
                savedUser.getEmail(),
                savedUser.getNumTel(),
                savedUser.getRole()
        );
    }
}