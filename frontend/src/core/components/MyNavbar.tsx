import { useEffect, useState } from "react";
import { BiMenu } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";

const MyNavbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
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
    `tracking-widest font-medium transition-colors text-black lg:${isScrolled ? "text-black" : "text-white"} ${
      isActive
        ? "text-amber-600 border-b-2 border-amber-600"
        : "hover:text-amber-500"
    }`;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-3 text-black"
          : "bg-white lg:bg-transparent lg:py-8 text-black lg:text-white"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex-1">
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tighter">
            FELIX HOTEL
          </h1>
        </div>
        <div className="hidden lg:flex flex-2 justify-center gap-10 items-center">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={getLinkStyle}>
              {link.label}
            </NavLink>
          ))}
        </div>
        <div className="hidden lg:flex flex-1 justify-end">
          <div
            className="cursor-pointer font-bold border-2 border-current px-6 py-2 hover:bg-amber-600 hover:text-white transition-all text-sm uppercase tracking-widest"
            onClick={() => navigate("/login")}
          >
            LOGIN
          </div>
        </div>
        <div
          className="lg:hidden cursor-pointer text-3xl text-black p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <BiMenu />
        </div>
      </div>
      <div
        className={`lg:hidden bg-white shadow-xl transition-all duration-300 overflow-hidden ${
          isMenuOpen ? "max-h-500px border-t" : "max-h-0"
        }`}
      >
        <div className="flex flex-col items-center py-8 gap-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className="tracking-widest font-medium py-3 w-full text-center text-black uppercase text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <div className="mt-4 w-3/4">
            <div
              className="cursor-pointer font-bold border-2 border-amber-600 text-amber-600 px-6 py-3 text-center uppercase tracking-widest text-sm hover:bg-amber-600 hover:text-white transition-all"
              onClick={() => navigate("/login")}
            >
              LOGIN
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MyNavbar;
