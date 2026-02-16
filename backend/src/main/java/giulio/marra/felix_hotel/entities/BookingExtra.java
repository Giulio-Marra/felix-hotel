package giulio.marra.felix_hotel.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class BookingExtra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "booking_id")
    @JsonBackReference
    private Booking booking;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private ExtraService extraService;

    private Integer quantity;
    private Double priceAtBooking;

    public BookingExtra() {
    }

    public BookingExtra(Booking booking, ExtraService extraService, Integer quantity, Double priceAtBooking) {
        this.booking = booking;
        this.extraService = extraService;
        this.quantity = quantity;
        this.priceAtBooking = priceAtBooking;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Booking getBooking() {
        return booking;
    }

    public void setBooking(Booking booking) {
        this.booking = booking;
    }

    public ExtraService getExtraService() {
        return extraService;
    }

    public void setExtraService(ExtraService extraService) {
        this.extraService = extraService;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getPriceAtBooking() {
        return priceAtBooking;
    }

    public void setPriceAtBooking(Double priceAtBooking) {
        this.priceAtBooking = priceAtBooking;
    }
}
