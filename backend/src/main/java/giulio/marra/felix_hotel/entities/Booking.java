package giulio.marra.felix_hotel.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import giulio.marra.felix_hotel.enums.BookingStatus;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private LocalDate bookingDate;
    private Double totalPrice;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<BookingItem> items = new ArrayList<>();

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<BookingExtra> extras;

    public Booking() {
    }

    public Booking(User user, LocalDate bookingDate, Double totalPrice, BookingStatus status, List<BookingItem> items, List<BookingExtra> extras) {
        this.user = user;
        this.bookingDate = bookingDate;
        this.totalPrice = totalPrice;
        this.status = status;
        this.items = items;
        this.extras = extras;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDate getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDate bookingDate) {
        this.bookingDate = bookingDate;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public BookingStatus getStatus() {
        return status;
    }

    public void setStatus(BookingStatus status) {
        this.status = status;
    }

    public List<BookingItem> getItems() {
        return items;
    }

    public void setItems(List<BookingItem> items) {
        this.items = items;
    }

    public List<BookingExtra> getExtras() {
        return extras;
    }

    public void setExtras(List<BookingExtra> extras) {
        this.extras = extras;
    }
}
