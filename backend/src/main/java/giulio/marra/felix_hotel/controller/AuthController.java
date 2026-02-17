package giulio.marra.felix_hotel.controller;

import giulio.marra.felix_hotel.dto.user.LoginResponseDto;
import giulio.marra.felix_hotel.dto.user.NewUserRequiredDto;
import giulio.marra.felix_hotel.dto.user.UserLoginRequiredDto;
import giulio.marra.felix_hotel.dto.user.UserResponseDto;
import giulio.marra.felix_hotel.services.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponseDto register(@RequestBody @Validated NewUserRequiredDto body) {
        return authService.save(body);
    }

    @PostMapping("/login")
    public LoginResponseDto login(@RequestBody @Validated UserLoginRequiredDto body) {
        String token = authService.authenticateUserAndGenerateToken(body.email(), body.password());
        return new LoginResponseDto(token);
    }
}
