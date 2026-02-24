import { axiosInstance } from "../../../core/api/axiosInstance";
import type { RoomResponse, RoomSearchFilter } from "../interfaces/roomInterface";


export const getAllRooms = async (): Promise<RoomResponse[]> => {
  const response = await axiosInstance.get<RoomResponse[]>('/api/rooms');
  return response.data;
}

export const getRoomById = async (id: string | undefined): Promise<RoomResponse> => {
  const response = await axiosInstance.get<RoomResponse>(`/api/rooms/${id}`);
  return response.data;
}

export const searchRooms = async (filter: RoomSearchFilter): Promise<RoomResponse[]> => {
  const response = await axiosInstance.get<RoomResponse[]>('/api/rooms/search', {
    params: filter
  });
  return response.data;
};