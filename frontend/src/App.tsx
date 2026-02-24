import { BrowserRouter, Route, Routes } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomePage from "./core/pages/HomePage";
import MainLayout from "./core/layouts/MainLayout";
import { useEffect } from "react";
import ErrorPage from "./core/pages/ErrorPage";
import RoomDetailsPage from "./features/rooms/pages/RoomDetailsPage";
import NotFoundPage from "./core/pages/NotFoundPage";
import RoomsAndSuitePage from "./features/rooms/pages/RoomsAndSuitePage";
import AboutPage from "./core/pages/AboutPage";
import SearchRoomPage from "./features/rooms/pages/SearchRoomPage";
import AuthLayout from "./core/layouts/AuthLayout";
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/rooms-suite" element={<RoomsAndSuitePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/room/details/:id" element={<RoomDetailsPage />} />
          <Route path="/search-room" element={<SearchRoomPage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route path="/server-down" element={<ErrorPage />} />
        <Route path="/not-found" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
