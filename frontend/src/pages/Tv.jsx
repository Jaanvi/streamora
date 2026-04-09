import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import MovieRow from "../components/MovieRow";

function Tv() {
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    API.get("/movies?type=tv")
      .then((res) => {
        setTvShows(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="pt-24">
        <MovieRow title="TV Shows" movies={tvShows} />
      </div>
    </div>
  );
}

export default Tv;