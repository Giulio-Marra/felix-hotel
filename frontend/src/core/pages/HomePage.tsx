import React from "react";
import SearchRoomForm from "../components/SearchRoomForm";

const HomePage = () => {
  return (
    <div className="home-page-container ">
      <div className="hero-container">
        <img
          src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Felix Hotel Pool"
          className="img-homepage"
        />
        <div className="dark-overlay">
          <div className="text-center text-white">
            <p className=""> BENVENUTI AL </p>
            <h2 className="text-9xl font-bold mb-4 border-b-2">Felix Hotel</h2>
            <p className="text-xl">Lusso e relax nel cuore della città</p>
          </div>
        </div>
      </div>
      <div>
        <SearchRoomForm />
        <div className="py-20 ">
          <div className="container mx-auto flex">
            <div className="flex-1 flex flex-col px-10 gap-6">
              <h4>BENVENUTI A</h4>
              <h2 className="text-6xl font-bold">Ciiita casuale </h2>
              <p className="text-gray-500 text-2xl">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
                assumenda veniam nesciunt molestias iste accusantium maxime
                expedita, ad minus vitae porro non. Eius id facilis ratione
                officia adipisci quam praesentium!
              </p>
            </div>
            <div className="flex-1">
              <img
                src="https://plus.unsplash.com/premium_photo-1697730545957-fbfe258301a0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
