import AOS from "aos";
import { useEffect } from "react";

const AboutPage = () => {
  useEffect(() => {
    // Inizializza o rinfresca le animazioni AOS quando la pagina carica
    AOS.refresh();
  }, []);

  return (
    <div className="min-h-screen bg-white text-neutral-800">
      {/* 1. HERO SECTION */}
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

      {/* 2. IL CONCEPT - TESTO E IMMAGINE */}
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

      {/* 3. STATISTICHE */}
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

      {/* 4. SERVIZI ESCLUSIVI */}
      {/* 4. SERVIZI ESCLUSIVI CON IMMAGINI */}
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Wellness & Spa */}
          <div
            className="group relative h-[500px] overflow-hidden shadow-xl"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <img
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop"
              alt="Wellness & Spa"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <h4 className="text-2xl font-serif mb-2">Wellness & Spa</h4>
              <p className="text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 leading-relaxed">
                Un santuario di rigenerazione con trattamenti personalizzati,
                piscina riscaldata e percorsi sensoriali unici.
              </p>
            </div>
          </div>

          {/* Gastronomia Stellata */}
          <div
            className="group relative h-[500px] overflow-hidden shadow-xl"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Gastronomia Stellata"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <h4 className="text-2xl font-serif mb-2">Gastronomia Stellata</h4>
              <p className="text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 leading-relaxed">
                Sapori autentici del territorio reinterpretati dai nostri chef
                premiati, in una cornice panoramica mozzafiato.
              </p>
            </div>
          </div>

          {/* Esperienze Locali */}
          <div
            className="group relative h-[500px] overflow-hidden shadow-xl"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <img
              src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop"
              alt="Esperienze Locali"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <h4 className="text-2xl font-serif mb-2">Esperienze Locali</h4>
              <p className="text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 leading-relaxed">
                Tour privati in barca, degustazioni in vigneti storici e accessi
                esclusivi ai tesori nascosti della città.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. SEZIONE VISION / CITAZIONE */}
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

      {/* 6. CALL TO ACTION FINALE */}
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
