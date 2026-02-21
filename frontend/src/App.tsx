import { BrowserRouter, Route, Routes } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";
import HomePage from "./core/pages/HomePage";
import MainLayout from "./core/layouts/MainLayout";
import { useEffect } from "react";
import ErrorPage from "./core/pages/ErrorPage";

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
        </Route>
        <Route path="/server-down" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
