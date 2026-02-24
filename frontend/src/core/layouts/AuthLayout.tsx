import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="main-container">
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
