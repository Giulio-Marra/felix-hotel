package giulio.marra.felix_hotel.repository;

import giulio.marra.felix_hotel.entities.Facility;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FacilityRepository extends JpaRepository<Facility, Long> {
    boolean existsByName(String name);
}
