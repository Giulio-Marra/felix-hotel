import { useEffect, useState } from "react";
import type { RoomResponse } from "../interfaces/roomInterface";
import { useNavigate, useParams } from "react-router";
import { getRoomById } from "../services/roomServices";
import Carousel from "../components/Carousel";
import MyLoader from "../../../core/components/MyLoader";

const RoomDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [room, setRoom] = useState<RoomResponse>();
  const [loading, setLoading] = useState<boolean>(true);
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRoom = async () => {
      try {
        setLoading(true);
        const data = await getRoomById(id);
        setRoom(data);
      } catch (error) {
        const err = error as { status?: number };
        setError(
          error +
            "Ops! Non siamo riusciti a caricare le camere del Felix Hotel.",
        );
        if (err.status === 404) {
          navigate("/not-found");
        }
      } finally {
        setLoading(false);
      }
    };

    loadRoom();
  }, [id, navigate]);

  if (loading) {
    return <MyLoader text="CARICANDO I DETTAGLI DELLA TUA CAMERA..." />;
  }

  return (
    <div className="container mx-auto  min-h-screen bg-white">
      <div className="mb-12 px-4">
        <Carousel images={room?.imageUrls} />
      </div>
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          <div className="md:col-span-8">
            <h1 className="text-5xl font-serif text-gray-900 mb-8">
              {room?.nameRoom}
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed font-light">
              {room?.description}
            </p>
          </div>
          <div className="md:col-span-4 grid grid-cols-2 gap-y-8 gap-x-4 border-l border-gray-100 pl-8 h-fit">
            <div>
              <h4 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">
                Capacità
              </h4>
              <p className="text-gray-800">{room?.maxOccupancy} Ospiti</p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">
                Tipologia
              </h4>
              <p className="text-gray-800">{room?.roomType}</p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">
                Prezzo
              </h4>
              <p className="text-amber-700 font-bold text-xl">
                €{room?.priceForNight}
              </p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">
                Disponibili
              </h4>
              <p className="text-gray-800">{room?.availableUnits} Unità</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-16 mb-20">
          <h2 className="text-4xl font-serif mb-12 italic">Room Benefits</h2>

          <div className="bg-gray-50 p-10 rounded-sm">
            <p className="text-xs tracking-widest uppercase text-gray-500 mb-8">
              La tua esperienza include:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
              {room?.facilities.map((f) => (
                <li
                  key={f.id}
                  className="flex items-start gap-3 text-sm text-gray-700 uppercase tracking-tighter"
                >
                  <span className="text-gray-300">•</span>
                  {f.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsPage;
