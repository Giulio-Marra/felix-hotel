import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type {
  RoomResponse,
  RoomSearchFilter,
} from "../interfaces/roomInterface";
import { searchRooms } from "../services/roomServices";
import { FallingLines } from "react-loader-spinner";
import RoomHomePageCard from "../../../core/components/RoomHomePageCard";
import SearchRoomForm from "../../../core/components/SearchRoomForm";

const SearchRoomPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<RoomResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filters = location.state as RoomSearchFilter | null;

  useEffect(() => {
    if (!filters) {
      const timer = setTimeout(() => navigate("/"), 4000);
      setError(
        "Sessione di ricerca scaduta. Verrai reindirizzato alla Home...",
      );
      return () => clearTimeout(timer);
    }

    const fetchFilteredRooms = async () => {
      setLoading(true);
      setError(null);
      setRooms([]);

      try {
        const data = await searchRooms(filters);
        setRooms(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredRooms();
  }, [filters, navigate]);

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-neutral-900 pt-32 pb-24 px-6">
        <div className="container mx-auto">
          <h1 className="text-white text-4xl font-serif text-center mb-12">
            Disponibilità per il tuo Soggiorno
          </h1>
          <div className="relative z-20 mt-50">
            <SearchRoomForm />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {error && (
          <div className="max-w-4xl mx-auto bg-amber-50 border-l-4 border-amber-600 p-6 rounded shadow-sm mb-10">
            <div className="flex items-center">
              <span className="text-amber-600 mr-3 text-2xl">⚠️</span>
              <p className="text-amber-900 font-medium tracking-wide uppercase text-sm">
                {error}
              </p>
            </div>
          </div>
        )}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <FallingLines color="#d97706" width="100" />
            <p className="mt-4 text-neutral-400 italic">
              Verifica disponibilità in tempo reale...
            </p>
          </div>
        ) : (
          <>
            {rooms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {rooms.map((room, index) => (
                  <RoomHomePageCard
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
                    Prova a modificare le date o a scegliere un'altra tipologia
                    di stanza.
                  </p>
                </div>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchRoomPage;
