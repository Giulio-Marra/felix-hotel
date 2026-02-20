package giulio.marra.felix_hotel.controller;

import giulio.marra.felix_hotel.dto.booking.AdminBookingRequestDto;
import giulio.marra.felix_hotel.dto.booking.BookingResponseDto;
import giulio.marra.felix_hotel.dto.booking.NewBookingItemRequiredDto;
import giulio.marra.felix_hotel.entities.User;
import giulio.marra.felix_hotel.enums.BookingStatus;
import giulio.marra.felix_hotel.services.BookingItemService;
import giulio.marra.felix_hotel.services.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/private/bookings")
public class BookingController {

    private final BookingService bookingService;
    private final BookingItemService bookingItemService;

    public BookingController(BookingService bookingService, BookingItemService bookingItemService) {
        this.bookingService = bookingService;
        this.bookingItemService = bookingItemService;
    }

    @GetMapping("/cart")
    public BookingResponseDto getMyCart(@AuthenticationPrincipal User user) {
        return bookingService.getUserCart(user);
    }

    @PostMapping("/cart/add")
    public ResponseEntity<String> addToCart(@RequestBody NewBookingItemRequiredDto body,
                                            @AuthenticationPrincipal User user) {
        String message = bookingItemService.addNewBookingItem(body, user);
        return ResponseEntity.ok(message);
    }

    @DeleteMapping("/cart/item/{itemId}")
    public ResponseEntity<String> removeFromCart(@PathVariable Long itemId,
                                                 @AuthenticationPrincipal User user) {
        String message = bookingItemService.removeBookingItem(itemId, user);
        return ResponseEntity.ok(message);
    }

    @PostMapping("/admin/quick-booking")
    @PreAuthorize("hasRole('ADMIN')")
    public BookingResponseDto adminQuickBooking(@RequestBody AdminBookingRequestDto body) {
        return bookingService.createBookingForNewOrExistingUser(body);
    }

    @GetMapping("/admin/search")
    @PreAuthorize("hasRole('ADMIN')")
    public List<BookingResponseDto> searchBookings(@RequestParam(required = false) String email,
                                                   @RequestParam(required = false) BookingStatus status) {
        return bookingService.searchBookingsAdmin(email, status, null, null);
    }
}
