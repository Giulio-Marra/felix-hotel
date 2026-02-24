import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const MyNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "HOME" },
    { path: "/about", label: "ABOUT" },
    { path: "/rooms-suite", label: "ROOMS & SUITES" },
    { path: "/contacts", label: "CONTACTS" },
  ];

  const getLinkStyle = ({ isActive }: { isActive: boolean }) =>
    `tracking-widest font-medium transition-colors ${isActive ? "text-amber-600 border-b border-amber-600" : "hover:text-amber-500"}`;

  return (
    <nav
      className={`   fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-md pt-2 text-black"
          : "bg-transparent py-6 text-white"
      }`}
    >
      <div className="container mx-auto px-6 flex pb-2 justify-between items-center border-b">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter">FELIX HOTEL</h1>
        </div>

        <div className="flex gap-10">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={getLinkStyle}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="cursor-pointer font-bold border-2 border-current px-4 py-1 hover:bg-amber-600 hover:text-white transition-all">
          LOGIN
        </div>
      </div>
    </nav>
  );
};

export default MyNavbar;
