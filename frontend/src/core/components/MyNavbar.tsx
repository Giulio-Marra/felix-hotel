import { NavLink } from "react-router-dom";

const MyNavbar = () => {
  const navLinks = [
    { path: "/", label: "HOME" },
    { path: "/about", label: "ABOUT" },
    { path: "/rooms", label: "ROOMS & SUITES" },
    { path: "/contacts", label: "CONTACTS" },
  ];

  const getLinkStyle = ({ isActive }: { isActive: boolean }) =>
    isActive ? "link-on" : "link-off";

  return (
    <nav className="flex place-content-between p-4 items-center container mx-auto ">
      <div>
        <h1 className="text-3xl font-bold">FELIX HOTEL</h1>
      </div>

      <div className="flex gap-10 ">
        {navLinks.map((link) => (
          <NavLink key={link.path} to={link.path} className={getLinkStyle}>
            {link.label}
          </NavLink>
        ))}
      </div>

      <div>
        <h1>LOGIN</h1>
      </div>
    </nav>
  );
};

export default MyNavbar;
