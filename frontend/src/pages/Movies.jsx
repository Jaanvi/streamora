import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import MovieRow from "../components/MovieRow";

function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    API.get("/movies?type=movie")
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="pt-24">
        <MovieRow title="Movies" movies={movies} />
      </div>
    </div>
  );
}

export default Movies;