import { axiosInstance } from "../../../core/api/axiosInstance"
import type { BookingCartResponse, BookingRequired } from "../interfaces/bookingInterfaces"


export const addBookingToCart = async(bookingData: BookingRequired):Promise<string> => {
    const response = await axiosInstance.post<string>("/private/bookings/cart/add", bookingData)
    return response.data
}

export const getMyBookingCart = async (): Promise<BookingCartResponse> => {
    const response = await axiosInstance.get<BookingCartResponse>("/private/bookings/cart/my-cart");
    return response.data;
};

export const delItemFromCart = async (itemId: number): Promise<string> => {
    const response = await axiosInstance.delete<string>(`/private/bookings/cart/item/${itemId}`);
    return response.data;
};