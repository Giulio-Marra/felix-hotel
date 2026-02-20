package giulio.marra.felix_hotel.repository;

import giulio.marra.felix_hotel.entities.Room;
import giulio.marra.felix_hotel.enums.RoomType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {

    @Query("SELECT r FROM Room r WHERE r.isAvailable = true " +
            "AND (:roomType IS NULL OR r.roomType = :roomType) " +
            "AND (:guests IS NULL OR r.maxOccupancy >= :guests) " +
            "AND (r.totalUnits > (" +
            "    SELECT COUNT(bi) FROM BookingItem bi " +
            "    WHERE bi.room.id = r.id " +
            "    AND bi.booking.status = 'CONFIRMED' " +
            "    AND bi.checkInDate < :checkOut " +
            "    AND bi.checkOutDate > :checkIn" +
            "))")
    List<Room> findAvailableRooms(
            @Param("checkIn") LocalDate checkIn,
            @Param("checkOut") LocalDate checkOut,
            @Param("roomType") RoomType roomType,
            @Param("guests") Integer guests
    );
}
