import React from "react";

const SearchRoomForm = () => {
  return (
    <div className="max-w-6xl mx-auto -mt-20 relative z-10 ">
      <div className="bg-white shadow-2xl flex flex-col md:flex-row items-stretch overflow-hidden ">
        <div className="flex-1 p-6 border-r border-gray-100">
          <label className="block text-[10px] font-bold   text-gray-400 mb-2">
            Check-in:
          </label>
          <input
            type="date"
            className="w-full text-2xl font-serif outline-none bg-transparent cursor-pointer"
            placeholder="Check-in Date"
          />
        </div>
        <div className="flex-1 p-6 border-r border-gray-100">
          <label className="block text-[10px] font-bold   text-gray-400 mb-2">
            Check-out:
          </label>
          <input
            type="date"
            className="w-full text-2xl font-serif outline-none bg-transparent cursor-pointer"
          />
        </div>
        <div className="flex-1 p-6 border-r border-gray-100">
          <label className="block text-[10px] font-bold   text-gray-400 mb-2">
            Stanza:
          </label>
          <select className="w-full text-2xl font-serif outline-none bg-transparent appearance-none cursor-pointer">
            <option>Singola</option>
            <option>Matrimoniale</option>
            <option>Luxury</option>
          </select>
        </div>
        <div className="flex-1 p-6 border-r border-gray-100 ">
          <label className="block text-[10px] font-bold   text-gray-400 mb-2">
            Persone:
          </label>
          <select className="w-full text-2xl  outline-none bg-transparent appearance-none cursor-pointer">
            <option className="optionBtn">1</option>
            <option>2</option>
            <option>4</option>
          </select>
        </div>
        <div className="bg-[#c5a47e] hover:bg-[#b3936a] transition-colors flex items-center justify-center px-12 py-8 cursor-pointer">
          <button className="text-white font-bold  text-sm ">Cerca</button>
        </div>
      </div>
    </div>
  );
};

export default SearchRoomForm;
