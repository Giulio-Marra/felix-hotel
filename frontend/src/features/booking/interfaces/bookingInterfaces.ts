import type { RoomResponse } from "../../rooms/interfaces/roomInterface";

export interface RoomSearchFilter {
  checkIn: string;
  checkOut: string;
  guests: number;
}

export interface BookingNavigationState {
  room: RoomResponse;
  searchFilters: RoomSearchFilter;
}

export interface BookingRoomCardProps {
  room: RoomResponse;
  delay: string;
  searchFilters: RoomSearchFilter | null; 
}

export interface BookingRequired {
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  quantity: number;
}

export interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface BookingUserResponse {
  email: string;
  numTel: string;
}

export interface BookingRoomResponse {
  nameRoom: string;
  maxOccupancy: number;
  priceForNight: number;
  discountPercentage: number;
}

export interface BookingItemResponse {
  id: number,
  room: BookingRoomResponse;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  priceAtBooking: number;
}


export interface BookingCartResponse {
  user: BookingUserResponse;
  bookingDate: string;
  totalPrice: number;
  status: string;
  items: BookingItemResponse[];
}