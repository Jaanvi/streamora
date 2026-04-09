import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import axios from "axios";

function MovieCard({ movie, refreshMovies }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const canDelete =
    user &&
    (user.role === "admin" ||
      String(movie.uploadedBy) === String(user._id) ||
      String(movie.uploadedBy?._id) === String(user._id));

  const handleDelete = async (e) => {
    e.stopPropagation(); // Prevent card click (watch page navigation)

    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${movie.title}"?`
    );

    if (!confirmDelete) return;

    try {
      const res = await axios.delete("http://localhost:5000/api/movies/delete", {
        data: {
          movieId: movie._id,
          userId: user._id,
        },
      });

      alert(res.data.message);

      // Refresh movie list after delete
      if (refreshMovies) refreshMovies();
    } catch (error) {
      console.error("Delete error:", error);
      alert(error.response?.data?.message || "Failed to delete movie");
    }
  };

  return (
    <div
      onClick={() => navigate(`/watch/${movie._id}`)}
      className="min-w-[200px] cursor-pointer transform hover:scale-110 transition duration-300 relative"
    >
      <img
        src={movie.poster || movie.image}
        alt={movie.title}
        className="rounded-md w-full h-[300px] object-cover"
      />

      <p className="text-sm mt-2 font-medium">{movie.title}</p>

      {canDelete && (
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full z-10"
          aria-label="Delete movie"
        >
          <FaTrash />
        </button>
      )}
    </div>
  );
}

export default MovieCard;