import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function WatchPage() {
  const { id } = useParams();
  const videoRef = useRef(null);

  const [movie, setMovie] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const fetchMovie = async () => {
    try {
      const movieRes = await API.get(`/movies/${id}`);
      setMovie(movieRes.data);

      if (user?._id) {
        const progressRes = await API.get(`/movies/progress/${user._id}/${id}`);
        const savedProgress = progressRes.data.progress || 0;

        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.currentTime = savedProgress;
          }
        }, 500);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveProgress = async () => {
    try {
      if (!videoRef.current || !user?._id) return;

      await API.post("/movies/progress", {
        userId: user._id,
        movieId: id,
        progress: Math.floor(videoRef.current.currentTime),
      });
    } catch (error) {
      console.error("Failed to save progress", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      saveProgress();
    }, 5000);

    return () => clearInterval(interval);
  }, [movie]);

  if (!movie) {
    return <div className="bg-black text-white min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="bg-black min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>

      <video
        ref={videoRef}
        controls
        autoPlay
        className="w-full max-w-6xl rounded-lg mx-auto"
        onPause={saveProgress}
        onEnded={saveProgress}
      >
        <source src={movie.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="max-w-6xl mx-auto mt-6">
        <p className="text-gray-300">{movie.description}</p>
        <p className="mt-3 text-sm text-gray-400">
          {movie.genre} • {movie.year} • {movie.duration}
        </p>
      </div>
    </div>
  );
}

export default WatchPage;