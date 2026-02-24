import { useState } from "react";
import type { UserLogin } from "../interfaces/authInterfaces";

interface Props {
  onSubmit: (data: UserLogin) => void;
}

const LoginForm = ({ onSubmit }: Props) => {
  const [formData, setFormData] = useState<UserLogin>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input
        name="email"
        type="email"
        required
        onChange={handleChange}
        className="w-full p-4 border border-neutral-200 focus:border-amber-600 outline-none transition-all font-serif italic"
        placeholder="Indirizzo Email"
      />
      <input
        name="password"
        type="password"
        required
        onChange={handleChange}
        className="w-full p-4 border border-neutral-200 focus:border-amber-600 outline-none transition-all font-serif italic"
        placeholder="Password"
      />
      <button className="w-full bg-[#08212b] text-amber-500 p-4 uppercase tracking-widest font-bold hover:bg-[#0c2d3a] transition-all">
        Accedi
      </button>
    </form>
  );
};

export default LoginForm;
