import { useState } from "react";
import type { RoomSearchFilter } from "../interfaces/roomInterface";
import { useLocation, useNavigate } from "react-router-dom";

const SearchRoomForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const existingFilters = location.state as RoomSearchFilter | null;

  const [searchParams, setSearchParams] = useState<RoomSearchFilter>({
    checkIn: existingFilters?.checkIn || "",
    checkOut: existingFilters?.checkOut || "",
    roomType: existingFilters?.roomType || "",
    guests: existingFilters?.guests || 1,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: name === "guests" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    navigate("/search-room", { state: searchParams });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-6xl mx-auto -mt-20 relative z-10"
    >
      <div className="bg-white shadow-2xl flex flex-col md:flex-row items-stretch overflow-hidden">
        <div className="flex-1 p-6 border-r border-gray-100">
          <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase">
            Check-in
          </label>
          <input
            name="checkIn"
            type="date"
            required
            value={searchParams.checkIn}
            onChange={handleInputChange}
            className="w-full text-xl font-serif outline-none bg-transparent cursor-pointer"
          />
        </div>
        <div className="flex-1 p-6 border-r border-gray-100">
          <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase">
            Check-out
          </label>
          <input
            name="checkOut"
            type="date"
            required
            value={searchParams.checkOut}
            onChange={handleInputChange}
            className="w-full text-xl font-serif outline-none bg-transparent cursor-pointer"
          />
        </div>
        <div className="flex-1 p-6 border-r border-gray-100">
          <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase">
            Stanza
          </label>
          <select
            name="roomType"
            value={searchParams.roomType}
            onChange={handleInputChange}
            className="w-full text-xl font-serif outline-none bg-transparent appearance-none cursor-pointer"
          >
            <option value="">Tutte</option>
            <option value="SINGLE">Singola</option>
            <option value="DOUBLE">Matrimoniale</option>
            <option value="TRIPLE">Tripla</option>
            <option value="SUITE">Suite</option>
            <option value="DELUXE">Deluxe</option>
          </select>
        </div>
        <div className="flex-1 p-6 border-r border-gray-100">
          <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase">
            Persone
          </label>
          <select
            name="guests"
            value={searchParams.guests}
            onChange={handleInputChange}
            className="w-full text-xl font-serif outline-none bg-transparent appearance-none cursor-pointer"
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4+</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-[#c5a47e] hover:bg-[#b3936a] text-white font-bold text-sm px-12 py-8 transition-colors uppercase tracking-widest"
        >
          Cerca
        </button>
      </div>
    </form>
  );
};

export default SearchRoomForm;
