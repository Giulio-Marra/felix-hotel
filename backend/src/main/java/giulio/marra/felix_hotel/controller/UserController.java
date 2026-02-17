package giulio.marra.felix_hotel.controller;

import giulio.marra.felix_hotel.dto.user.UserResponseDto;
import giulio.marra.felix_hotel.entities.User;
import giulio.marra.felix_hotel.services.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public UserResponseDto getProfile(@AuthenticationPrincipal User currentUser) {
        return userService.findByMe(currentUser);
    }
}
