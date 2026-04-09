import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import MovieRow from "../components/MovieRow";
import ContinueWatchingRow from "../components/ContinueWatchingRow";

function Home() {
  const [movies, setMovies] = useState([]);

  const fetchMovies = () => {
    API.get("/movies")
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const trending = movies.slice(0, 10);
  const topRated = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 10);
  const actionMovies = movies.filter((m) => m.genre === "Action");
  const tvShows = movies.filter((m) => m.type === "tv");

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <HeroBanner />

      <ContinueWatchingRow />

      <MovieRow title="Trending Now" movies={trending} refreshMovies={fetchMovies} />
      <MovieRow title="Top Rated" movies={topRated} refreshMovies={fetchMovies} />
      <MovieRow title="Action Movies" movies={actionMovies} refreshMovies={fetchMovies} />
      <MovieRow title="TV Series" movies={tvShows} refreshMovies={fetchMovies} />
    </div>
  );
}

export default Home;