import { useNavigate } from "react-router-dom";
import type {
  BookingRoomCardProps,
  BookingNavigationState,
} from "../interfaces/bookingInterfaces";

const BookingRoomCard = ({
  room,
  delay,
  searchFilters,
}: BookingRoomCardProps) => {
  const navigate = useNavigate();

  const handleBookingNavigation = () => {
    if (!searchFilters) {
      console.error("Dati di ricerca mancanti");
      return;
    }

    const navigationState: BookingNavigationState = {
      room,
      searchFilters,
    };

    navigate(`/booking/${room.id}`, { state: navigationState });
  };

  return (
    <div
      className="group bg-white border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-500 rounded-sm overflow-hidden"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="relative overflow-hidden h-72">
        <img
          src={
            room.imageUrls && room.imageUrls.length > 0
              ? room.imageUrls[0]
              : "https://via.placeholder.com/600x400"
          }
          alt={room.nameRoom}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {room.availableUnits <= 3 && room.availableUnits > 0 && (
          <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-tighter">
            Solo {room.availableUnits} rimaste
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2 ">
          <h3 className="text-xl font-serif text-neutral-900 group-hover:text-amber-700 transition-colors uppercase tracking-tight">
            {room.nameRoom}
          </h3>
          <span className="text-[10px] text-neutral-400 uppercase tracking-widest border border-neutral-200 px-2 py-0.5">
            {room.roomType}
          </span>
        </div>

        <p className="text-neutral-500 text-sm font-light line-clamp-2 mb-4 leading-relaxed">
          {room.description}
        </p>

        <div className="space-y-2 mb-6">
          <div className="flex items-center text-xs text-neutral-600 gap-2">
            <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
            Max {room.maxOccupancy} Persone
          </div>
          <div className="flex items-center text-xs text-neutral-600 gap-2 font-medium">
            <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
            Disponibilità per questa data: {room.availableUnits} unità
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-neutral-50">
          <div>
            <p className="text-[10px] text-neutral-400 uppercase tracking-widest">
              Prezzo Notte
            </p>
            <p className="text-xl font-serif text-amber-700">
              €{room.priceForNight}
            </p>
          </div>

          <button
            onClick={handleBookingNavigation}
            className="bg-neutral-900 text-white px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-amber-700 transition-all duration-300"
          >
            Aggiungi Prenotazione
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingRoomCard;
