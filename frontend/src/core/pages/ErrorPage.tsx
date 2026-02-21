import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-white p-10 text-center">
      <div className="z-10 flex flex-col items-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Spiacenti, il server è a riposo
        </h2>
        <p className="text-gray-500 max-w-md mb-8">
          Stiamo effettuando una manutenzione straordinaria o il server ha avuto
          un piccolo intoppo. Il team del Felix Hotel sta già risolvendo.
        </p>

        <button
          onClick={() => navigate("/")}
          className="bg-amber-600 hover:bg-amber-700 cursor-pointer text-white px-8 py-3 font-bold uppercase tracking-widest transition-all"
        >
          Torna alla Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
