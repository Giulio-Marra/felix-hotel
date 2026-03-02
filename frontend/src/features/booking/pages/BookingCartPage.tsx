import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { BookingCartResponse } from "../interfaces/bookingInterfaces";
import { delItemFromCart, getMyBookingCart } from "../services/bookingServices";
import MyLoader from "../../../core/components/MyLoader";

const BookingCartPage = () => {
  const navigate = useNavigate();
  const [booking, setBooking] = useState<BookingCartResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await getMyBookingCart();
      setBooking(data);
    } catch (err) {
      setError("Impossibile caricare il riepilogo della prenotazione.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleDelItem = async (itemId: number) => {
    try {
      setLoading(true);
      await delItemFromCart(itemId);
      await fetchCart();
    } catch (error) {
      console.error("Errore durante la rimozione:", error);
      alert("Non è stato possibile rimuovere la camera. Riprova.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <MyLoader text="AGGIORNAMENTO PRENOTAZIONE..." />;

  if (error || !booking || booking.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
        <h2 className="text-3xl font-serif mb-8 text-neutral-800 italic">
          Il tuo carrello è vuoto.
        </h2>
        <button
          onClick={() => navigate("/rooms-suite")}
          className="border border-neutral-900 px-10 py-4 text-xs font-bold uppercase tracking-[0.3em] hover:bg-neutral-900 hover:text-white transition-all"
        >
          Esplora le Suite
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50/50 pt-40 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="border-b border-neutral-200 pb-10 mb-16 flex justify-between items-end">
          <div>
            <p className="text-[10px] uppercase tracking-[0.5em] text-amber-600 mb-2 font-bold">
              La tua selezione
            </p>
            <h1 className="text-5xl font-serif uppercase tracking-tighter text-neutral-900">
              Conferma Prenotazioni
            </h1>
          </div>
          <p className="text-neutral-400 text-sm italic font-light hidden md:block text-right">
            Felix Hotel • Esperienza Unica
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-8">
            {booking.items.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-neutral-100 p-10 shadow-sm relative group"
              >
                <button
                  onClick={() => handleDelItem(item.id)}
                  className="absolute top-6 right-10 text-[9px] uppercase tracking-widest text-neutral-400 hover:text-red-800 transition-colors flex items-center gap-1"
                >
                  <span>Rimuovi</span>
                  <span className="text-sm">×</span>
                </button>

                <div className="flex flex-col md:flex-row justify-between pt-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="h-[1px] w-12 bg-amber-600"></span>
                      <span className="text-[10px] uppercase tracking-widest font-black text-neutral-400">
                        Camera Riservata
                      </span>
                    </div>

                    <h3 className="text-3xl font-serif mb-2 text-neutral-800 uppercase italic tracking-tight">
                      {item.room.nameRoom}
                    </h3>

                    <div className="flex flex-wrap gap-12 mt-10">
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-neutral-400 mb-2">
                          Check-In
                        </p>
                        <p className="text-lg font-medium text-neutral-700">
                          {item.checkInDate}
                        </p>
                      </div>
                      <div className="h-10 w-[1px] bg-neutral-100 hidden md:block"></div>
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-neutral-400 mb-2">
                          Check-Out
                        </p>
                        <p className="text-lg font-medium text-neutral-700">
                          {item.checkOutDate}
                        </p>
                      </div>
                      <div className="h-10 w-[1px] bg-neutral-100 hidden md:block"></div>
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-neutral-400 mb-2">
                          Ospiti
                        </p>
                        <p className="text-lg font-medium text-neutral-700">
                          {item.numberOfGuests} Persone
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 md:mt-0 md:text-right flex flex-col justify-end">
                    <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-1">
                      Prezzo Camera
                    </p>
                    <p className="text-3xl font-serif text-neutral-900 font-light">
                      €{item.priceAtBooking}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-4">
            <div className="bg-white p-10 sticky top-32 shadow-sm border border-neutral-100">
              <h2 className="font-serif text-2xl mb-10 border-b border-neutral-50 pb-6 uppercase italic tracking-tighter text-neutral-800">
                Riepilogo
              </h2>

              <div className="space-y-6 mb-12">
                <div className="flex justify-between text-xs tracking-widest text-neutral-500 uppercase">
                  <span>Totale Soggiorno</span>
                  <span className="text-neutral-900 font-bold">
                    €{booking.totalPrice}
                  </span>
                </div>
                <div className="flex justify-between text-xs tracking-widest text-neutral-500 uppercase">
                  <span>Tasse e Oneri</span>
                  <span className="text-neutral-400 italic font-light lowercase">
                    incluse
                  </span>
                </div>

                <div className="pt-8 border-t border-neutral-100 flex justify-between items-baseline">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-black text-amber-600">
                    Totale
                  </span>
                  <span className="text-5xl font-serif text-neutral-900">
                    €{booking.totalPrice}
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate("/payment")}
                className="w-full bg-neutral-900 text-white py-6 text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-amber-700 transition-all duration-500 shadow-xl"
              >
                Conferma e Pagamento
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCartPage;
