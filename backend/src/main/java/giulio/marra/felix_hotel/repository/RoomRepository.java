package giulio.marra.felix_hotel.repository;

import giulio.marra.felix_hotel.entities.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {
}
