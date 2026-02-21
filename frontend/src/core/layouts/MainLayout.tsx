import { Outlet } from "react-router-dom";
import MyNavbar from "../components/MyNavbar";
import MyFooter from "../components/MyFooter";

const MainLayout = () => {
  return (
    <div className="main-container">
      <MyNavbar />
      <main>
        <Outlet />
      </main>
      <MyFooter />
    </div>
  );
};

export default MainLayout;
