import { useEffect, useState } from "react";
import type { RoomResponse } from "../interfaces/roomInterface";
import { getAllRooms } from "../services/roomServices";
import { FallingLines } from "react-loader-spinner";
import RoomHomePageCard from "../../../core/components/RoomHomePageCard";

const RoomsAndSuitePage = () => {
  const [rooms, setRooms] = useState<RoomResponse[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  console.log(rooms);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        setLoading(true);
        const data = await getAllRooms();
        setRooms(data);
      } catch (err) {
        setError(err + "errore nel recupero delle stanze");
      } finally {
        setLoading(false);
      }
    };
    loadRooms();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <FallingLines
            color="#d97706"
            width="100"
            visible={true}
            ariaLabel="falling-circles-loading"
          />
          <p className="mt-4 text-amber-600 font-medium tracking-widest animate-pulse">
            PREPARANDO IL TUO SOGGIORNO...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1170&auto=format&fit=crop"
          alt="Felix Hotel Luxury"
          className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white px-4">
          <h2
            className="text-4xl md:text-6xl font-serif tracking-tighter mb-4"
            data-aos="fade-up"
          >
            Rooms & Suites
          </h2>
          <div
            className="h-1 w-20 bg-amber-600 mb-4"
            data-aos="fade-up"
            data-aos-delay="200"
          ></div>
          <p
            className="text-lg md:text-xl tracking-widest font-light"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            L'ECCELLENZA DELL'ACCOGLIENZA
          </p>
        </div>
      </div>
      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col items-center mb-16 text-center">
          <h3 className="text-2xl font-medium text-neutral-800 tracking-widest uppercase mb-4">
            Le nostre proposte
          </h3>
          <p className="text-neutral-500 max-w-2xl italic">
            Ogni camera è concepita per essere un'oasi di pace nel cuore
            pulsante della città, dove ogni dettaglio racconta una storia di
            lusso e comfort.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {rooms?.map((room, index) => (
            <RoomHomePageCard
              key={room.id}
              room={room}
              delay={(index * 200).toString()}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomsAndSuitePage;
