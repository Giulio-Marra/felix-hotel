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
      if (!filters) {
        return;
      }
      setLoading(true);
      setError(null);
      setRooms([]);
      try {
        const data = await searchRooms(filters);
        setRooms(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Si è verificato un errore inaspettato";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredRooms();
  }, [filters, navigate]);

  if (loading) {
    return <MyLoader text="CERCO LE CAMERE DISPONIBILI PER LE TUE DATE..." />;
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-neutral-900 pt-32 pb-24 px-6">
        <div className="container mx-auto mt-10">
          <h1 className="text-white text-4xl font-serif text-center mb-12">
            Disponibilità per il tuo Soggiorno
          </h1>
          <div className="relative z-20 mt-80">
            <SearchRoomForm />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {error && (
          <div className="max-w-2xl mx-auto text-center mb-10 py-6 border-y border-neutral-200">
            <p className="text-neutral-400 font-serif italic text-lg tracking-wide">
              {error}
            </p>
          </div>
        )}

        {rooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {rooms.map((room, index) => (
              <RoomCard
                key={room.id}
                room={room}
                delay={(index * 100).toString()}
              />
            ))}
          </div>
        ) : (
          !error && (
            <div className="text-center py-20">
              <h3 className="text-2xl font-serif text-neutral-400 mb-2">
                Nessuna camera disponibile
              </h3>
              <p className="text-neutral-500">
                Prova a modificare le date o a scegliere un'altra tipologia di
                stanza.
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SearchRoomPage;
