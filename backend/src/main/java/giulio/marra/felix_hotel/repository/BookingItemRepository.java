package giulio.marra.felix_hotel.repository;

import giulio.marra.felix_hotel.entities.BookingItem;
import giulio.marra.felix_hotel.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface BookingItemRepository extends JpaRepository<BookingItem, Long> {
    @Query("SELECT COUNT(bi) FROM BookingItem bi " +
            "WHERE bi.room.id = :roomId " +
            "AND bi.booking.status = 'CONFIRMED' " +
            "AND (:checkIn < bi.checkOutDate AND :checkOut > bi.checkInDate)")
    Integer countConfirmedOccupiedUnits(Long roomId, LocalDate checkIn, LocalDate checkOut);

    Optional<BookingItem> findByIdAndBookingUser(Long id, User user);
}
