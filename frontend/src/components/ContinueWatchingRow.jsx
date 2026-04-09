import { useEffect, useState } from "react";
import API from "../services/api";
import MovieCard from "./MovieCard";

function ContinueWatchingRow() {
  const [items, setItems] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?._id) {
      API.get(`/movies/continue/${user._id}`)
        .then((res) => setItems(res.data))
        .catch((err) => console.error(err));
    }
  }, []);

  if (!items.length) return null;

  return (
    <div className="px-8 my-6">
      <h2 className="text-xl font-bold mb-3">Continue Watching</h2>

      <div className="flex gap-4 overflow-x-scroll scrollbar-hide">
        {items.map((item) => (
          <MovieCard key={item.movie._id} movie={item.movie} />
        ))}
      </div>
    </div>
  );
}

export default ContinueWatchingRow;