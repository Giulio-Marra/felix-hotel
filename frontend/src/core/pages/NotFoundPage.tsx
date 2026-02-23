import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-white p-10 text-center">
      <div className="flex flex-col items-center">
        <h1 className="text-[12rem] font-serif leading-none text-gray-100 absolute z-0 select-none">
          404
        </h1>

        <div className="z-10 flex flex-col items-center">
          <h2 className="text-4xl font-serif text-gray-900 mb-4 uppercase tracking-[0.2em]">
            Pagina Non Trovata
          </h2>
          <p className="text-gray-500 max-w-md mb-8 font-light italic">
            Sembra che la risorsa che stai cercando si sia persa tra i corridoi
            del nostro hotel. Permettici di riaccompagnarti all'ingresso
            principale.
          </p>

          <button
            onClick={() => navigate("/")}
            className="border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-10 py-4 font-bold uppercase tracking-[0.3em] transition-all duration-500"
          >
            Ritorna al Felix Hotel
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
