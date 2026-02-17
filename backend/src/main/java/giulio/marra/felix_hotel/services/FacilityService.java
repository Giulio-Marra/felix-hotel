package giulio.marra.felix_hotel.services;

import giulio.marra.felix_hotel.dto.facility.FacilityResponseDto;
import giulio.marra.felix_hotel.dto.facility.NewFacilityRequiredDto;
import giulio.marra.felix_hotel.entities.Facility;
import giulio.marra.felix_hotel.exceptions.AlreadyExistException;
import giulio.marra.felix_hotel.exceptions.BadRequestException;
import giulio.marra.felix_hotel.exceptions.NotFoundException;
import giulio.marra.felix_hotel.repository.FacilityRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacilityService {
    private final FacilityRepository facilityRepository;

    public FacilityService(FacilityRepository facilityRepository) {
        this.facilityRepository = facilityRepository;
    }

    private FacilityResponseDto mapToResponseDto(Facility facility) {
        return new FacilityResponseDto(
                facility.getId(),
                facility.getName()
        );
    }

    public FacilityResponseDto findFacilityById(Long facilityId) {
        return facilityRepository.findById(facilityId)
                .map(this::mapToResponseDto)
                .orElseThrow(() -> new NotFoundException("Facility non trovata"));
    }

    public FacilityResponseDto saveNewFacility(NewFacilityRequiredDto body) {
        if (facilityRepository.existsByName(body.name())) {
            throw new AlreadyExistException("Facility gia esistente");
        }
        Facility facility = new Facility(body.name());
        Facility savedFacility = facilityRepository.save(facility);
        return mapToResponseDto(savedFacility);
    }

    public String deleteFacilityById(Long facilityId) {
        if (!facilityRepository.existsById(facilityId)) {
            throw new NotFoundException("Impossibile eliminare: Facility con ID " + facilityId + " non trovata.");
        }
        facilityRepository.deleteById(facilityId);
        return "Facility eliminata con successo!";
    }

    public List<FacilityResponseDto> findAllFacility() {
        return facilityRepository.findAll()
                .stream()
                .map(this::mapToResponseDto)
                .toList();
    }

    public FacilityResponseDto updateFacility(Long id, NewFacilityRequiredDto body) {
        Facility existingFacility = facilityRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Impossibile aggiornare: Facility non trovata"));

        if (facilityRepository.existsByName(body.name())) {
            throw new BadRequestException("Esiste già un'altra facility con questo nome");
        }

        existingFacility.setName(body.name());
        Facility updatedFacility = facilityRepository.save(existingFacility);
        return mapToResponseDto(updatedFacility);
    }

    public Facility findEntityById(Long facilityId) {
        return facilityRepository.findById(facilityId)
                .orElseThrow(() -> new NotFoundException("Facility con ID " + facilityId + " non trovata"));
    }

}
