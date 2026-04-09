import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/browse");
    }
  }, [navigate]);

  const posters = [
    "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg", // Avengers
    "https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg", // Dark Knight
    "https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg", // Interstellar
    "https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg", // Stranger Things style
    "https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg", // Avengers Infinity War
    "https://image.tmdb.org/t/p/w500/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg", // Breaking Bad style
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Poster Grid */}
      <div className="absolute inset-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 opacity-30">
        {posters.map((poster, index) => (
          <img
            key={index}
            src={poster}
            alt="poster"
            className="w-full h-full object-cover"
          />
        ))}
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-red-600 mb-4">
          Streamora
        </h1>

        <h2 className="text-2xl sm:text-4xl font-bold mb-4">
          Entertainment at Every Doorstep
        </h2>

        <p className="text-gray-300 text-sm sm:text-lg max-w-2xl mb-8">
          Watch movies, TV shows, trending series, thrillers, comedy, and more —
          all in one place. Stream anytime, anywhere with Streamora.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-red-600 px-8 py-3 rounded-md text-lg font-semibold hover:bg-red-700 transition"
          >
            Sign In
          </button>

          <button
            onClick={() => navigate("/register")}
            className="bg-white text-black px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-300 transition"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;