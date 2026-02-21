const MyFooter = () => {
  return (
    <footer className="bg-[#08212b] text-white py-16 px-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-gray-700 pt-10">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold tracking-widest">FELIX HOTEL</h2>
          <p className="text-gray-400 max-w-xs">
            Un'oasi di pace e lusso, dove ogni dettaglio è pensato per il tuo
            benessere.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-[#c5a47e] font-semibold uppercase tracking-wider">
            Link Utili
          </h4>
          <ul className="flex flex-col gap-2 text-gray-400">
            <li className="hover:text-white cursor-pointer transition">
              Le Camere
            </li>
            <li className="hover:text-white cursor-pointer transition">
              Ristorante
            </li>
            <li className="hover:text-white cursor-pointer transition">
              Centro Benessere
            </li>
            <li className="hover:text-white cursor-pointer transition">
              Privacy Policy
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-[#c5a47e] font-semibold uppercase tracking-wider">
            Contatti
          </h4>
          <div className="text-gray-400 flex flex-col gap-2">
            <p>Via delle Stelle, 42 - Milano</p>
            <p>T: +39 02 123 4567</p>
            <p>E: booking@felixhotel.com</p>
          </div>
        </div>
      </div>
      <div className="text-center mt-20 text-gray-500 text-sm border-t border-gray-800 pt-5">
        &copy; {new Date().getFullYear()} Felix Hotel. Tutti i diritti
        riservati.
      </div>
    </footer>
  );
};

export default MyFooter;
