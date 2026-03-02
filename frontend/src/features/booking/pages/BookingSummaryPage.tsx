import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type {
  BookingNavigationState,
  BookingRequired,
} from "../interfaces/bookingInterfaces";
import { BsArrowLeft, BsCheck2Circle } from "react-icons/bs";
import { BiCalendar, BiHome, BiUserPlus } from "react-icons/bi";
import { addBookingToCart } from "../services/bookingServices";
import axios from "axios";
import MyLoader from "../../../core/components/MyLoader";
import BookingModal from "../components/BookingModal";

const BookingSummaryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const state = location.state as BookingNavigationState;
  const { room, searchFilters } = state;
  const [guests, setGuests] = useState(state?.searchFilters?.guests || 1);
  const [quantity, setQuantity] = useState(1);
  const start = new Date(searchFilters.checkIn);
  const end = new Date(searchFilters.checkOut);

  const [modal, setModal] = useState<boolean>(false);

  if (!state) {
    return (
      <div className="h-screen flex flex-col items-center justify-center font-serif">
        <p className="mb-4">Dati mancanti, sessione scaduta.</p>
        <button
          onClick={() => navigate("/")}
          className="text-amber-700 underline"
        >
          Torna alla Home
        </button>
      </div>
    );
  }

  const nights = Math.ceil(
    Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
  );
  const totalPrice = nights * room.priceForNight * quantity;

  const handleConfirmBooking = async () => {
    const formattedCheckIn = start.toISOString().split("T")[0];
    const formattedCheckOut = end.toISOString().split("T")[0];

    const payload: BookingRequired = {
      roomId: room.id,
      checkInDate: formattedCheckIn,
      checkOutDate: formattedCheckOut,
      numberOfGuests: guests,
      quantity: quantity,
    };
    try {
      setLoading(true);
      await addBookingToCart(payload);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorMessage =
          err.response?.data?.message || "Errore durante la prenotazione";
        setError(errorMessage);
      } else {
        setError("Si è verificato un errore imprevisto");
      }
    } finally {
      setLoading(false);
      setModal(true);
    }
  };

  if (loading) {
    <MyLoader text="Stiamo aggiungendo la tua prenotazione al carrello...." />;
  }

  return (
    <div className="min-h-screen bg-white pb-20 pt-32">
      <BookingModal isOpen={modal} onClose={() => setModal(false)} />
      <div className="max-w-5xl mx-auto px-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-neutral-400 hover:text-amber-700 transition-colors mb-12 group"
        >
          <BsArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="uppercase text-[10px] tracking-[0.2em] font-bold">
            Torna alla selezione
          </span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <span className="text-amber-600 text-[10px] tracking-[0.3em] uppercase block mb-2">
              Luxury Experience
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-neutral-900 mb-8 italic">
              {room.nameRoom}
            </h1>

            <div className="aspect-video overflow-hidden mb-10 shadow-sm rounded-sm">
              <img
                src={room.imageUrls[0]}
                alt={room.nameRoom}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="prose prose-neutral max-w-none">
              <h3 className="font-serif text-2xl text-neutral-800 mb-4 uppercase tracking-tighter">
                La Camera
              </h3>
              <p className="text-neutral-500 leading-relaxed font-light text-lg">
                {room.description}
              </p>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-neutral-50 p-8 border border-neutral-100 sticky top-32 shadow-sm">
              <h3 className="font-serif text-xl mb-6 border-b border-neutral-200 pb-4 text-neutral-800 uppercase tracking-widest text-center">
                Dettagli Prenotazione
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <BiCalendar size={18} className="text-amber-600 mt-1" />
                  <div>
                    <p className="text-[10px] text-neutral-400 uppercase tracking-widest mb-1 font-bold">
                      Check-in / Out
                    </p>
                    <p className="text-sm font-medium">
                      {searchFilters.checkIn} — {searchFilters.checkOut}
                    </p>
                    <p className="text-xs text-neutral-500 italic">
                      {nights} notti totali
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <BiUserPlus size={18} className="text-amber-600 mt-1" />
                  <div className="flex-1">
                    <p className="text-[10px] text-neutral-400 uppercase tracking-widest mb-1 font-bold">
                      Numero Ospiti
                    </p>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full bg-transparent border-b border-neutral-300 py-1 focus:outline-none focus:border-amber-600 text-sm cursor-pointer appearance-none"
                    >
                      {[...Array(room.maxOccupancy)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} {i === 0 ? "Ospite" : "Ospiti"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <BiHome size={18} className="text-amber-600 mt-1" />
                  <div className="flex-1">
                    <p className="text-[10px] text-neutral-400 uppercase tracking-widest mb-1 font-bold">
                      Quantità Camere
                    </p>
                    <select
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-full bg-transparent border-b border-neutral-300 py-1 focus:outline-none focus:border-amber-600 text-sm cursor-pointer appearance-none"
                    >
                      {[...Array(room.availableUnits)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} {i === 0 ? "Camera" : "Camere"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {room.facilities && room.facilities.length > 0 && (
                  <div className="pt-6 mt-6 border-t border-neutral-200">
                    <p className="text-[10px] text-neutral-400 uppercase tracking-widest mb-3 font-bold">
                      Servizi inclusi
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {room.facilities.map((facility, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1.5 bg-white border border-neutral-200 px-2 py-1 rounded-sm shadow-sm group hover:border-amber-500 transition-colors"
                        >
                          <BsCheck2Circle
                            className="text-amber-600"
                            size={12}
                          />
                          <span className="text-[10px] text-neutral-600 uppercase tracking-tight font-medium group-hover:text-neutral-900">
                            {facility.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-12 pt-6 border-t border-neutral-200 bg-neutral-100/50 -mx-8 px-8 pb-4">
                {error && <span className="text-red-600">{error}</span>}
                <div className="flex justify-between items-end">
                  <p className="text-[10px] text-neutral-400 uppercase tracking-[0.2em] font-bold">
                    Totale Finale
                  </p>
                  <p className="text-3xl font-serif text-amber-700">
                    €{totalPrice}
                  </p>
                </div>
                <p className="text-[9px] text-neutral-400 text-right mt-1  italic">
                  Tasse e servizi inclusi
                </p>
              </div>

              <button
                onClick={handleConfirmBooking}
                className="w-full mt-4 bg-neutral-900 text-white py-5 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-amber-700 transition-all duration-500 shadow-xl active:scale-[0.98]"
              >
                Aggiungi al Carrello
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummaryPage;
