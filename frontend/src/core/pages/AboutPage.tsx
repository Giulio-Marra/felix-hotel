import AOS from "aos";
import { useEffect } from "react";
import ServiceCard from "../components/ServiceCard";

const AboutPage = () => {
  const services = [
    {
      title: "Wellness & Spa",
      text: "Un santuario di rigenerazione con trattamenti personalizzati e percorsi sensoriali.",
      imageUrl:
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop",
      delay: "100",
    },
    {
      title: "Gastronomia Stellata",
      text: "Sapori autentici del territorio reinterpretati dai nostri chef premiati.",
      imageUrl:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1170&auto=format&fit=crop",
      delay: "200",
    },
    {
      title: "Esperienze Locali",
      text: "Tour privati in barca e accessi esclusivi ai tesori nascosti della città.",
      imageUrl:
        "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop",
      delay: "300",
    },
  ];
  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <div className="min-h-screen bg-white text-neutral-800">
      <div className="relative h-[80vh] flex items-center justify-center bg-neutral-900 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          alt="Felix Hotel Lobby"
        />
        <div className="relative z-10 text-center">
          <h1
            className="text-5xl md:text-7xl font-serif text-white tracking-tighter"
            data-aos="fade-down"
          >
            La Nostra Storia
          </h1>
          <p
            className="text-amber-500 tracking-[0.3em] uppercase mt-4 font-light"
            data-aos="fade-up"
          >
            Dal 1920, l'arte dell'accoglienza
          </p>
        </div>
      </div>
      <div className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div data-aos="fade-right">
            <span className="text-amber-600 font-medium tracking-widest uppercase text-sm">
              Il Concept
            </span>
            <h2 className="text-4xl font-serif mt-4 mb-8 leading-tight">
              Dove il lusso incontra <br /> l'anima della città.
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-6">
              Il Felix Hotel nasce dalla visione di trasformare un antico
              palazzo nobiliare in un rifugio contemporaneo per viaggiatori
              esigenti. Ogni arredo è stato scelto per onorare l'artigianato
              locale, fondendo materiali nobili come il marmo e il velluto con
              le più moderne tecnologie.
            </p>
            <p className="text-neutral-600 leading-relaxed">
              Non siamo solo un hotel; siamo il punto d'incontro tra la storia e
              il futuro dell'ospitalità mediterranea.
            </p>
          </div>
          <div className="relative" data-aos="zoom-in">
            <div className="absolute -top-4 -left-4 w-64 h-64 bg-amber-100 -z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
              alt="Interior Design"
              className="shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </div>
      <div className="bg-neutral-100 py-20">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            { label: "Anni di Storia", value: "25+" },
            { label: "Camere Esclusive", value: "48" },
            { label: "Premi Vinti", value: "12" },
            { label: "Ospiti Felici", value: "15k" },
          ].map((stat, i) => (
            <div key={i} data-aos="fade-up" data-aos-delay={i * 100}>
              <h3 className="text-4xl font-serif text-amber-700">
                {stat.value}
              </h3>
              <p className="text-sm text-neutral-500 uppercase tracking-widest mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="container mx-auto px-6 py-24 border-t border-neutral-100">
        <div className="text-center mb-16">
          <span className="text-amber-600 font-medium tracking-[0.2em] uppercase text-xs">
            Esperienze
          </span>
          <h2
            className="text-3xl md:text-4xl font-serif mt-2"
            data-aos="fade-up"
          >
            L'Essenza dell'Eccellenza
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              imageUrl={service.imageUrl}
              title={service.title}
              text={service.text}
              delay={service.delay}
            />
          ))}
        </div>
      </div>
      <div className="relative py-32 bg-neutral-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop"
            alt="Felix Hotel Atmosphere"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 container mx-auto px-6 text-center italic">
          <p
            className="text-2xl md:text-4xl font-serif max-w-4xl mx-auto leading-relaxed"
            data-aos="zoom-in"
          >
            "L'ospitalità non è accogliere qualcuno in casa nostra, ma far sì
            che quel qualcuno si senta a casa propria fin dal primo istante."
          </p>
          <div className="mt-8 h-px w-24 bg-amber-600 mx-auto"></div>
          <p className="mt-6 uppercase tracking-[0.4em] text-sm font-light">
            Felix Hotel Team
          </p>
        </div>
      </div>
      <div className="py-24 text-center">
        <h2 className="text-3xl font-serif mb-8" data-aos="fade-up">
          Vieni a vivere l'esperienza Felix.
        </h2>
        <button
          className="border-2 border-neutral-800 px-10 py-4 hover:bg-neutral-800 hover:text-white transition-all tracking-widest uppercase text-sm"
          data-aos="fade-up"
        >
          Prenota ora il tuo soggiorno
        </button>
      </div>
    </div>
  );
};

export default AboutPage;
