import { Outlet } from "react-router-dom";
import MyNavbar from "../components/MyNavbar";

const MainLayout = () => {
  return (
    <div className="main-container">
      <MyNavbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
