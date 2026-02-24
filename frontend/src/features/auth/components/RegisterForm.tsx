import { useState } from "react";
import type { UserRegister } from "../interfaces/authInterfaces";

interface Props {
  onSubmit: (data: UserRegister) => void;
}

const RegisterForm = ({ onSubmit }: Props) => {
  const [formData, setFormData] = useState<UserRegister>({
    name: "",
    surname: "",
    email: "",
    password: "",
    numTel: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input
          name="name"
          type="text"
          required
          onChange={handleChange}
          className="w-full p-4 border border-neutral-200 focus:border-amber-600 outline-none transition-all font-serif italic"
          placeholder="Nome"
        />
        <input
          name="surname"
          type="text"
          required
          onChange={handleChange}
          className="w-full p-4 border border-neutral-200 focus:border-amber-600 outline-none transition-all font-serif italic"
          placeholder="Cognome"
        />
      </div>
      <input
        name="email"
        type="email"
        required
        onChange={handleChange}
        className="w-full p-4 border border-neutral-200 focus:border-amber-600 outline-none transition-all font-serif italic"
        placeholder="Email"
      />
      <input
        name="password"
        type="password"
        required
        onChange={handleChange}
        className="w-full p-4 border border-neutral-200 focus:border-amber-600 outline-none transition-all font-serif italic"
        placeholder="Password"
      />
      <input
        name="numTel"
        type="tel"
        required
        onChange={handleChange}
        className="w-full p-4 border border-neutral-200 focus:border-amber-600 outline-none transition-all font-serif italic"
        placeholder="Telefono"
      />
      <button className="w-full bg-[#08212b] text-amber-500 p-4 uppercase tracking-widest font-bold hover:bg-[#0c2d3a] transition-all mt-4">
        Crea Account
      </button>
    </form>
  );
};

export default RegisterForm;
