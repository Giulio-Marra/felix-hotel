package giulio.marra.felix_hotel.entities;

import giulio.marra.felix_hotel.enums.RoomType;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nameRoom;
    private Integer maxOccupancy;

    @Column(length = 1000)
    private String description;

    @ElementCollection
    @CollectionTable(name = "room_images", joinColumns = @JoinColumn(name = "room_id"))
    @Column(name = "image_url")
    private List<String> imageUrls;

    private Double priceForNight;
    private Double discountPercentage;
    private Boolean isAvailable;

    @Enumerated(EnumType.STRING)
    private RoomType roomType;

    @ManyToMany
    @JoinTable(
            name = "room_facilities",
            joinColumns = @JoinColumn(name = "room_id"),
            inverseJoinColumns = @JoinColumn(name = "facility_id")
    )
    private List<Facility> facilities;

    public Room() {
    }

    public Room(String nameRoom, Integer maxOccupancy, String description, List<String> imageUrls, Double priceForNight, Double discountPercentage, Boolean isAvailable, RoomType roomType, List<Facility> facilities) {
        this.nameRoom = nameRoom;
        this.maxOccupancy = maxOccupancy;
        this.description = description;
        this.imageUrls = imageUrls;
        this.priceForNight = priceForNight;
        this.discountPercentage = discountPercentage;
        this.isAvailable = isAvailable;
        this.roomType = roomType;
        this.facilities = facilities;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameRoom() {
        return nameRoom;
    }

    public void setNameRoom(String nameRoom) {
        this.nameRoom = nameRoom;
    }

    public Integer getMaxOccupancy() {
        return maxOccupancy;
    }

    public void setMaxOccupancy(Integer maxOccupancy) {
        this.maxOccupancy = maxOccupancy;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(List<String> imageUrls) {
        this.imageUrls = imageUrls;
    }

    public Double getPriceForNight() {
        return priceForNight;
    }

    public void setPriceForNight(Double priceForNight) {
        this.priceForNight = priceForNight;
    }

    public Boolean getAvailable() {
        return isAvailable;
    }

    public void setAvailable(Boolean available) {
        isAvailable = available;
    }

    public RoomType getRoomType() {
        return roomType;
    }

    public void setRoomType(RoomType roomType) {
        this.roomType = roomType;
    }

    public List<Facility> getFacilities() {
        return facilities;
    }

    public void setFacilities(List<Facility> facilities) {
        this.facilities = facilities;
    }

    public Double getDiscountPercentage() {
        return discountPercentage;
    }

    public void setDiscountPercentage(Double discountPercentage) {
        this.discountPercentage = discountPercentage;
    }
}
