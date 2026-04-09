import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function UploadMovie() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "Action",
    type: "movie",
    year: "",
    rating: "",
    duration: "",
  });

  const [poster, setPoster] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!poster || !video) {
      alert("Please select poster and video");
      return;
    }

    try {
      setLoading(true);

      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user._id) {
        alert("Please login first before uploading.");
        setLoading(false);
        return;
      }

      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      data.append("uploadedBy", user._id);
      data.append("poster", poster);
      data.append("video", video);

      const res = await API.post("/movies/upload", data);

      alert("Movie uploaded successfully!");

      setFormData({
        title: "",
        description: "",
        genre: "Action",
        type: "movie",
        year: "",
        rating: "",
        duration: "",
      });
      setPoster(null);
      setVideo(null);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="pt-28 px-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Upload Movie / Series</h1>

        <form onSubmit={handleSubmit} className="space-y-4 bg-zinc-900 p-6 rounded-xl">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 rounded bg-zinc-800"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 rounded bg-zinc-800"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <select
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="p-3 rounded bg-zinc-800"
            >
              <option>Action</option>
              <option>Comedy</option>
              <option>Drama</option>
              <option>Thriller</option>
              <option>Romance</option>
              <option>Horror</option>
              <option>SciFi</option>
              <option>Documentary</option>
            </select>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="p-3 rounded bg-zinc-800"
            >
              <option value="movie">Movie</option>
              <option value="tv">TV Series</option>
            </select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <input
              type="number"
              name="year"
              placeholder="Year"
              value={formData.year}
              onChange={handleChange}
              className="p-3 rounded bg-zinc-800"
              required
            />

            <input
              type="number"
              step="0.1"
              name="rating"
              placeholder="Rating"
              value={formData.rating}
              onChange={handleChange}
              className="p-3 rounded bg-zinc-800"
            />

            <input
              type="text"
              name="duration"
              placeholder="Duration (e.g. 2h 15m)"
              value={formData.duration}
              onChange={handleChange}
              className="p-3 rounded bg-zinc-800"
            />
          </div>

          <div>
            <label className="block mb-2">Poster Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPoster(e.target.files[0])}
              className="w-full"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Movie / Episode Video</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0])}
              className="w-full"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded font-semibold"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadMovie;