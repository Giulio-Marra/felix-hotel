import { useNavigate } from "react-router-dom";
import type { ErrorLayoutProps } from "../interfaces/genericTinterfaces";

const ErrorLayout = ({
  code,
  title,
  message,
  buttonText,
  isMainError,
}: ErrorLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-white p-10 text-center relative overflow-hidden">
      {code && (
        <h1 className="text-[12rem] md:text-[20rem] font-serif leading-none text-neutral-50 absolute z-0 select-none pointer-events-none">
          {code}
        </h1>
      )}

      <div className="z-10 flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4 uppercase tracking-[0.2em]">
          {title}
        </h2>
        <p className="text-gray-500 max-w-md mb-8 font-light italic leading-relaxed">
          {message}
        </p>

        <button
          onClick={() => navigate("/")}
          className={`px-10 py-4 font-bold uppercase tracking-[0.3em] transition-all duration-500 ${
            isMainError
              ? "bg-amber-600 text-white hover:bg-amber-700 shadow-lg"
              : "border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white"
          }`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ErrorLayout;
