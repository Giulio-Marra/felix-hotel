import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authServices";
import LoginForm from "../components/LoginForm";
import type { UserLogin } from "../interfaces/authInterfaces";
import MyLoader from "../../../core/components/MyLoader";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (data: UserLogin) => {
    setLoading(true);
    setError(null);
    try {
      await loginUser(data);
      navigate("/");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.status === 404
            ? "Credenziali non trovate."
            : err.message,
        );
      } else {
        setError("Errore imprevisto");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <MyLoader text="VERIFICANDO LE CREDENZIALI..." />;

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center px-4">
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
            Riservato agli Ospiti
          </h4>
          <h2 className="text-4xl font-bold text-neutral-900">Bentornato</h2>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-2 border-red-500">
            <p className="text-red-700 font-serif italic text-sm">{error}</p>
          </div>
        )}

        <LoginForm onSubmit={handleLogin} />

        <div className="mt-10 text-center border-t border-neutral-100 pt-6">
          <p className="text-neutral-500 font-serif italic mb-2">
            Non hai ancora un account?
          </p>
          <button
            onClick={() => navigate("/register")}
            className="text-neutral-900 font-bold uppercase tracking-widest text-xs hover:text-amber-600 transition-colors"
          >
            Registrati ora
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
