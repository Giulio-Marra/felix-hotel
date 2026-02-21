import { axiosInstance } from "../../../core/api/axiosInstance";
import type { RoomResponse } from "../interfaces/roomInterface";


export const getAllRooms = async (): Promise<RoomResponse[]> => {
  const response = await axiosInstance.get<RoomResponse[]>('/api/rooms');
  return response.data;
}