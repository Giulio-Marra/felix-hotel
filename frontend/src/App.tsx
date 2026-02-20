import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./core/pages/HomePage";
import MainLayout from "./core/layouts/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
