package giulio.marra.felix_hotel.controller;

import giulio.marra.felix_hotel.dto.facility.FacilityResponseDto;
import giulio.marra.felix_hotel.dto.facility.NewFacilityRequiredDto;
import giulio.marra.felix_hotel.services.FacilityService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/facilities")
@Validated
public class FacilityController {

    private final FacilityService facilityService;

    public FacilityController(FacilityService facilityService) {
        this.facilityService = facilityService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAuthority('ADMIN')")
    public FacilityResponseDto createFacility(@RequestBody @Valid NewFacilityRequiredDto body) {
        return facilityService.saveNewFacility(body);
    }

    @GetMapping
    public List<FacilityResponseDto> getAllFacilities() {
        return facilityService.findAllFacility();
    }

    @GetMapping("/{id}")
    public FacilityResponseDto getFacilityById(@PathVariable Long id) {
        return facilityService.findFacilityById(id);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public FacilityResponseDto updateFacility(@PathVariable Long id, @RequestBody @Valid NewFacilityRequiredDto body) {
        return facilityService.updateFacility(id, body);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public String deleteFacility(@PathVariable Long id) {
        return facilityService.deleteFacilityById(id);
    }
}
