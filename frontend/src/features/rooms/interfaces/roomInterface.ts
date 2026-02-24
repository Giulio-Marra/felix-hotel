export interface Facility {
  id: number;
  name: string;
}

export interface RoomResponse {
  id: number;
  nameRoom: string;
  maxOccupancy: number;
  totalUnits: number;
  availableUnits: number;
  description: string;
  imageUrls: string[];
  priceForNight: number;
  discountPercentage: number;
  isAvailable: boolean;
  roomType: string;
  facilities: Facility[];
}

export interface RoomSearchFilter {
  checkIn: string;    
  checkOut: string;  
  roomType?: string;  
  guests?: number;   
}