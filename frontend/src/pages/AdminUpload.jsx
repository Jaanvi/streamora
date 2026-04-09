import { useState } from "react";
import axios from "axios";

const AdminUpload = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    type: "movie",
    year: "",
    rating: "",
    duration: "",
  });

  const [poster, setPoster] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePosterChange = (e) => {
    setPoster(e.target.files[0]);
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!poster || !video) {
      setMessage("Please select both poster image and video file.");
      return;
    }

    try {
      setLoading(true);

      const uploadData = new FormData();

      // Text fields
      const user = JSON.parse(localStorage.getItem("user"));

      uploadData.append("title", formData.title);
      uploadData.append("description", formData.description);
      uploadData.append("genre", formData.genre);
      uploadData.append("type", formData.type);
      uploadData.append("year", formData.year);
      uploadData.append("rating", formData.rating);
      uploadData.append("duration", formData.duration);
      uploadData.append("uploadedBy", user._id);

      // Files
      uploadData.append("poster", poster);
      uploadData.append("video", video);

      const res = await axios.post(
        "http://localhost:5000/api/movies/upload",
        uploadData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(res.data.message || "Movie uploaded successfully!");

      // Reset form
      setFormData({
        title: "",
        description: "",
        genre: "",
        type: "movie",
        year: "",
        rating: "",
        duration: "",
      });
      setPoster(null);
      setVideo(null);

      // reset file inputs manually
      document.getElementById("posterInput").value = "";
      document.getElementById("videoInput").value = "";
    } catch (error) {
  console.error("Upload error full:", error);
  console.log("Backend response:", error.response?.data);

  setMessage(
    error.response?.data?.message ||
    error.message ||
    "Failed to upload movie."
  );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-3xl mx-auto bg-zinc-900 p-8 rounded-2xl shadow-2xl border border-zinc-800">
        <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-2 text-center">
          Streamora Admin Upload
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Upload Movies & TV Series for your users
        </p>

        {message && (
          <div className="mb-6 p-3 rounded-lg bg-zinc-800 text-center text-sm border border-zinc-700">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block mb-2 font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter movie title"
              className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 outline-none focus:border-red-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Enter description"
              className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 outline-none focus:border-red-500"
            />
          </div>

          {/* Genre */}
          <div>
            <label className="block mb-2 font-medium">Genre</label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              required
              placeholder="Action, Drama, Sci-Fi..."
              className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 outline-none focus:border-red-500"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block mb-2 font-medium">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 outline-none focus:border-red-500"
            >
              <option value="movie">Movie</option>
              <option value="tv">TV Series</option>
            </select>
          </div>

          {/* Year + Rating */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 font-medium">Year</label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
                placeholder="2025"
                className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Rating</label>
              <input
                type="text"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                required
                placeholder="8.5"
                className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 outline-none focus:border-red-500"
              />
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block mb-2 font-medium">Duration</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              placeholder="2h 15m or 45m/episode"
              className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 outline-none focus:border-red-500"
            />
          </div>

          {/* Poster Upload */}
          <div>
            <label className="block mb-2 font-medium">Poster Image</label>
            <input
              id="posterInput"
              type="file"
              accept="image/*"
              onChange={handlePosterChange}
              required
              className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 file:mr-4 file:rounded file:border-0 file:bg-red-600 file:px-4 file:py-2 file:text-white hover:file:bg-red-700"
            />
          </div>

          {/* Video Upload */}
          <div>
            <label className="block mb-2 font-medium">Movie / Series Video</label>
            <input
              id="videoInput"
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              required
              className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 file:mr-4 file:rounded file:border-0 file:bg-red-600 file:px-4 file:py-2 file:text-white hover:file:bg-red-700"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 transition-all py-3 rounded-lg font-semibold text-lg"
          >
            {loading ? "Uploading..." : "Upload Content"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminUpload;