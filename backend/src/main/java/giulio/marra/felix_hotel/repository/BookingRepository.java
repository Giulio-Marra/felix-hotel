package giulio.marra.felix_hotel.repository;

import giulio.marra.felix_hotel.entities.Booking;
import giulio.marra.felix_hotel.entities.User;
import giulio.marra.felix_hotel.enums.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    Optional<Booking> findByUserAndStatus(User user, BookingStatus status);

    List<Booking> findByUserEmail(String email);

    List<Booking> findByUser(User user);

    @Query("SELECT b FROM Booking b WHERE " +
            "(:email IS NULL OR b.user.email = :email) AND " +
            "(:status IS NULL OR b.status = :status) AND " +
            "(:startDate IS NULL OR b.bookingDate >= :startDate) AND " +
            "(:endDate IS NULL OR b.bookingDate <= :endDate)")
    List<Booking> searchBookingsAdmin(
            @Param("email") String email,
            @Param("status") BookingStatus status,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );
}
