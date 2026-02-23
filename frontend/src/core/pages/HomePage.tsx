import SearchRoomForm from "../components/SearchRoomForm";
import ServiceCard from "../components/ServiceCard";
import ReviewCard from "../components/ReviewCard";
import { FallingLines } from "react-loader-spinner";
import { useEffect, useState } from "react";
import type { RoomResponse } from "../../features/rooms/interfaces/roomInterface";
import { getAllRooms } from "../../features/rooms/services/roomServices";
import RoomHomePageCard from "../components/RoomHomePageCard";

const reviews = [
  {
    name: "Marco R., Italia",
    text: "Un'esperienza magica. Il personale ci ha fatti sentire come a casa.",
    delay: "100",
  },
  {
    name: "Elena S., Spagna",
    text: "La colazione in terrazza è qualcosa di indimenticabile. Torneremo sicuramente!",
    delay: "300",
  },
  {
    name: "James L., UK",
    text: "Luxury at its best. The spa is world-class and the rooms are extremely clean.",
    delay: "500",
  },
];

const HomePage = () => {
  const [rooms, setRooms] = useState<RoomResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        setLoading(true);
        const data = await getAllRooms();
        setRooms(data);
      } catch (err: unknown) {
        setError(
          err + "Ops! Non siamo riusciti a caricare le camere del Felix Hotel.",
        );
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
    <div className="home-page-container ">
      <div className="hero-container">
        <video autoPlay loop muted playsInline className="img-homepage">
          <source
            src="https://www.pexels.com/it-it/download/video/4069480/"
            type="video/mp4"
          />
          Il tuo browser non supporta il formato video.
        </video>
        <div className="dark-overlay">
          <div className="text-center text-white">
            <p className=""> BENVENUTI AL </p>
            <h2 className="text-9xl font-bold mb-4 border-b-2">Felix Hotel</h2>
            <p className="text-xl">Lusso e relax nel cuore della città</p>
          </div>
        </div>
      </div>
      <div>
        <SearchRoomForm />
        <div className="py-20 ">
          <div className="container mx-auto flex">
            <div
              className="flex-1 flex flex-col px-10 gap-6"
              data-aos="fade-right"
            >
              <h4>BENVENUTI A</h4>
              <h2 className="text-6xl font-bold">Felix City </h2>
              <p className="text-gray-500 text-2xl">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
                assumenda veniam nesciunt molestias iste accusantium maxime
                expedita, ad minus vitae porro non. Eius id facilis ratione
                officia adipisci quam praesentium!
              </p>
            </div>
            <div className="flex-1" data-aos="fade-left">
              <img
                src="https://plus.unsplash.com/premium_photo-1697730545957-fbfe258301a0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="py-20 bg-amber-50">
          <div className="container mx-auto px-10">
            <div className="text-center mb-16" data-aos="fade-up">
              <h4 className="text-amber-600 tracking-widest uppercase text-sm">
                Esperienze Esclusive
              </h4>
              <h2 className="text-5xl font-bold mt-2">I Nostri Servizi</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ServiceCard
                title="Ristorante"
                text="Sapori gourmet vista mare"
                imageUrl="https://images.unsplash.com/photo-1508424757105-b6d5ad9329d0?q=80&w=735"
                delay="100"
              />

              <ServiceCard
                title="Piscina"
                text="Relax totale nella nostra Infinity Pool"
                imageUrl="https://images.unsplash.com/photo-1551491603-7d38b9e605f5?q=80&w=735"
                delay="300"
              />

              <ServiceCard
                title="Spiaggia"
                text="Sabbia d'oro e acque cristalline"
                imageUrl="https://images.unsplash.com/photo-1473221326025-9183b464bb7e?q=80&w=1074"
                delay="500"
              />
            </div>
          </div>
        </div>
        <div className="py-20 bg-white">
          <div className="container mx-auto px-10 text-center">
            <h4 className="text-amber-600 tracking-widest uppercase text-sm mb-2">
              Dicono di noi
            </h4>
            <h2 className="text-5xl font-bold mb-12">
              Recensioni degli Ospiti
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {reviews.map((review, index) => (
                <ReviewCard
                  key={index}
                  name={review.name}
                  text={review.text}
                  delay={review.delay}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="py-20 bg-amber-50">
          <div className="container mx-auto px-10">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h4 className="text-amber-600 tracking-widest uppercase text-sm">
                  Soggiorni di Classe
                </h4>
                <h2 className="text-5xl font-bold mt-2">Le Nostre Camere</h2>
              </div>
              <button className="border-b-2 border-amber-600 pb-1 font-bold hover:text-amber-700 transition-all uppercase text-sm tracking-widest">
                Vedi tutte le camere
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {rooms.length > 0 ? (
                rooms
                  .slice(0, 2)
                  .map((room, index) => (
                    <RoomHomePageCard
                      key={room.id}
                      room={room}
                      delay={(index * 200).toString()}
                    />
                  ))
              ) : (
                <div className="col-span-2 text-center py-10 border-2 border-dashed border-amber-200 rounded-xl">
                  <p className="text-gray-500 italic">
                    Stiamo aggiornando le nostre suite esclusive. Contattaci
                    direttamente per conoscere le disponibilità attuali.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="py-16 bg-[#08212b] text-white">
          <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-8">
            <div data-aos="fade-up">
              <h3 className="text-4xl font-bold text-amber-500">15</h3>
              <p className="uppercase tracking-widest text-sm mt-2">
                Anni di Eccellenza
              </p>
            </div>
            <div data-aos="fade-up" data-aos-delay="100">
              <h3 className="text-4xl font-bold text-amber-500">42</h3>
              <p className="uppercase tracking-widest text-sm mt-2">
                Camere di Lusso
              </p>
            </div>
            <div data-aos="fade-up" data-aos-delay="200">
              <h3 className="text-4xl font-bold text-amber-500">5★</h3>
              <p className="uppercase tracking-widest text-sm mt-2">
                Rating Ospiti
              </p>
            </div>
            <div data-aos="fade-up" data-aos-delay="300">
              <h3 className="text-4xl font-bold text-amber-500">100%</h3>
              <p className="uppercase tracking-widest text-sm mt-2">
                Relax Garantito
              </p>
            </div>
          </div>
        </div>
        <div
          className="relative py-24 bg-fixed bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1170')",
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative container mx-auto text-center text-white px-10">
            <h2 className="text-5xl font-bold mb-6">
              Pronto per un soggiorno indimenticabile?
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto">
              Prenota oggi stesso la tua camera e assicurati la migliore tariffa
              garantita.
            </p>
            <button className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-4 font-bold uppercase tracking-widest transition-all">
              Prenota Ora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
