import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type {
  RoomResponse,
  RoomSearchFilter,
} from "../interfaces/roomInterface";
import { searchRooms } from "../services/roomServices";
import MyLoader from "../../../core/components/MyLoader";
import SearchRoomForm from "../components/SearchRoomForm";
import RoomCard from "../components/RoomCard";

const SearchRoomPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<RoomResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filters = location.state as RoomSearchFilter | null;

  useEffect(() => {
    const fetchFilteredRooms = async () => {
      if (!filters) return;

      setLoading(true);
      setError(null);
      try {
        const data = await searchRooms(filters);
        setRooms(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Errore durante la ricerca",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredRooms();
  }, [filters, navigate]);

  if (loading) return <MyLoader text="VERIFICA DISPONIBILITÀ IN CORSO..." />;

  return (
    <div className="min-h-screen bg-white">
      <header className="relative bg-neutral-900 pt-40 pb-32 px-6">
        <div className="container mx-auto relative z-10 text-center">
          <span className="text-amber-500 tracking-[0.4em] uppercase text-xs mb-4 block">
            Felix Hotel Experience
          </span>
          <h1 className="text-white text-4xl md:text-5xl font-serif mb-8">
            Le Nostre Soluzioni
          </h1>
          <div className="max-w-5xl mx-auto shadow-2xl">
            <SearchRoomForm />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 pb-6 border-b border-neutral-100">
          <div>
            <h2 className="text-2xl font-serif text-neutral-800">
              Camere disponibili
            </h2>
            <p className="text-neutral-500 text-sm mt-1">
              {rooms.length} opzioni trovate per le date selezionate
            </p>
          </div>
        </div>

        {error && (
          <div className="text-center py-12 bg-neutral-50 rounded-sm mb-10">
            <p className="text-neutral-600 italic font-serif">{error}</p>
          </div>
        )}

        {rooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {rooms.map((room, index) => (
              <div key={room.id} className="group">
                <RoomCard room={room} delay={(index * 100).toString()} />
              </div>
            ))}
          </div>
        ) : (
          !error && (
            <div className="max-w-xl mx-auto text-center py-32">
              <div className="w-16 h-px bg-amber-600 mx-auto mb-8"></div>
              <h3 className="text-2xl font-serif text-neutral-800 mb-4">
                Nessuna camera disponibile
              </h3>
              <p className="text-neutral-500 leading-relaxed">
                Le date selezionate potrebbero essere al completo. Ti suggeriamo
                di provare date alternative o contattare la nostra reception.
              </p>
            </div>
          )
        )}
      </main>
    </div>
  );
};

export default SearchRoomPage;
