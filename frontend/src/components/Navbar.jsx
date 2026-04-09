import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaUserCircle, FaBars, FaTimes } from "react-icons/fa"; // install react-icons if not done

function Navbar() {
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) setShow(true);
      else setShow(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/search?q=${query}`);
      setQuery("");
      setMobileMenu(false);
    }
  };

  const handleClickLink = (type) => {
    // type: "" for home, "movies" or "tv"
    navigate(type ? `/${type}` : "/browse");
    setMobileMenu(false);
  };

  return (
    <div
      className={`fixed w-full z-50 px-4 sm:px-8 py-4 flex justify-between items-center transition-colors duration-500 ${
        show ? "bg-black" : ""
      }`}
    >
      {/* Logo */}
      <h1
        className="text-red-600 text-3xl font-bold cursor-pointer"
        onClick={() => navigate("/browse")}
      >
        Streamora
      </h1>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-6 text-white text-sm">
        <p className="cursor-pointer hover:text-gray-400" onClick={() => handleClickLink("")}>Home</p>
        <p className="cursor-pointer hover:text-gray-400" onClick={() => handleClickLink("tv")}>TV Shows</p>
        <p className="cursor-pointer hover:text-gray-400" onClick={() => handleClickLink("movies")}>Movies</p>
        {localStorage.getItem("user") && (
          <p className="cursor-pointer hover:text-gray-400" onClick={() => navigate("/upload")}>Upload</p>
        )}
      </div>

      {/* Search + Profile */}
      <div className="flex items-center gap-4">
        <form onSubmit={handleSearch} className="hidden sm:flex items-center gap-2">
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-2 py-1 rounded-md bg-gray-800 text-white focus:outline-none"
          />
          <button type="submit" className="text-white">
            <FaSearch />
          </button>
        </form>

        <div className="relative">
          {localStorage.getItem("user") ? (
            <>
              <FaUserCircle
                size={28}
                className="cursor-pointer"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              />
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-gray-900 text-white rounded shadow-lg py-2">
                  <p className="px-4 py-2 hover:bg-gray-700 cursor-pointer" onClick={() => navigate("/history")}>History</p>
                  <p className="px-4 py-2 hover:bg-gray-700 cursor-pointer" onClick={() => navigate("/settings")}>Settings</p>
                  <p className="px-4 py-2 hover:bg-gray-700 cursor-pointer" onClick={() => {
                    localStorage.removeItem("user");
                    navigate("/login");
                  }}>Sign Out</p>
                </div>
              )}
            </>
          ) : (
            <Link to="/login">
              <button className="bg-red-600 px-4 py-2 rounded hover:bg-red-700">Sign In</button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="sm:hidden ml-2">
          {mobileMenu ? (
            <FaTimes size={24} className="cursor-pointer" onClick={() => setMobileMenu(false)} />
          ) : (
            <FaBars size={24} className="cursor-pointer" onClick={() => setMobileMenu(true)} />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="absolute top-full left-0 w-full bg-black flex flex-col gap-4 px-4 py-4 sm:hidden text-white">
          <p className="cursor-pointer hover:text-gray-400" onClick={() => handleClickLink("")}>Home</p>
          <p className="cursor-pointer hover:text-gray-400" onClick={() => handleClickLink("tv")}>TV Shows</p>
          <p className="cursor-pointer hover:text-gray-400" onClick={() => handleClickLink("movies")}>Movies</p>
          {localStorage.getItem("user") && (
            <p className="cursor-pointer hover:text-gray-400" onClick={() => { navigate("/upload"); setMobileMenu(false); }}>Upload</p>
          )}

          <form onSubmit={handleSearch} className="flex items-center gap-2 mt-2">
            <input
              type="text"
              placeholder="Search movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="px-2 py-1 rounded-md bg-gray-800 text-white focus:outline-none w-full"
            />
            <button type="submit"><FaSearch className="text-white" /></button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Navbar;