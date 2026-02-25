import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import type { UserRegister } from "../interfaces/authInterfaces";
import MyLoader from "../../../core/components/MyLoader";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleRegister = async (data: UserRegister) => {
    setLoading(true);
    setError(null);
    try {
      await register(data);
      navigate("/login");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.status === 409
            ? "Email già registrata nei nostri sistemi."
            : err.message,
        );
      } else {
        setError("Errore durante la creazione del profilo.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <MyLoader text="PREPARANDO IL TUO SOGGIORNO..." />;

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center px-4 py-10">
      <div
        className="mb-12 text-center cursor-pointer group"
        onClick={() => navigate("/")}
      >
        <p className="text-xs tracking-[0.3em] text-neutral-400 group-hover:text-amber-600 transition-colors uppercase mb-2">
          Torna alla Home
        </p>
        <h1 className="text-5xl font-bold text-[#08212b] border-b-2 border-transparent group-hover:border-amber-600 transition-all inline-block pb-2">
          Felix Hotel
        </h1>
      </div>
      <div className="max-w-md w-full bg-white p-10 shadow-2xl border-t-4 border-amber-600">
        <div className="text-center mb-10">
          <h4 className="text-amber-600 tracking-widest uppercase text-xs mb-2">
            Inizia l'Esperienza
          </h4>
          <h2 className="text-4xl font-bold text-neutral-900">
            Unisciti a Noi
          </h2>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-2 border-red-500 text-center">
            <p className="text-red-700 font-serif italic text-sm">{error}</p>
          </div>
        )}

        <RegisterForm onSubmit={handleRegister} />

        <div className="mt-8 text-center border-t border-neutral-100 pt-6">
          <p className="text-neutral-500 font-serif italic mb-2">
            Hai già un account?
          </p>
          <button
            onClick={() => navigate("/login")}
            className="text-neutral-900 font-bold uppercase tracking-widest text-xs hover:text-amber-600 transition-colors"
          >
            Accedi ora
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
