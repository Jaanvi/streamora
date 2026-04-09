const Movie = require("../models/Movie");
const WatchProgress = require("../models/WatchProgress");
const User = require("../models/User");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

// Helper function to upload buffer to Cloudinary
const uploadToCloudinary = (buffer, folder, resource_type = "image") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// ====================== GET ALL MOVIES ======================
const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find()
      .populate("uploadedBy", "name email role")
      .sort({ createdAt: -1 });

    res.json(movies);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch movies",
      error: error.message,
    });
  }
};

// ====================== GET MOVIE BY ID ======================
const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate(
      "uploadedBy",
      "name email role"
    );

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json(movie);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch movie",
      error: error.message,
    });
  }
};

// ====================== ADD MOVIE ======================
const addMovie = async (req, res) => {
  try {
    // Check Cloudinary env variables
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      return res.status(500).json({
        message:
          "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET in .env",
      });
    }

    const {
      title,
      description,
      genre,
      type,
      year,
      rating,
      duration,
      featured,
      uploadedBy,
    } = req.body;

    // Validate upload owner
    if (!uploadedBy) {
      return res.status(400).json({
        message: "uploadedBy is required. Please login and upload with authenticated user.",
      });
    }

    // Validate files
    if (!req.files || !req.files.poster || !req.files.video) {
      return res.status(400).json({
        message: "Poster image and video file are required",
      });
    }

    const posterFile = req.files.poster[0];
    const videoFile = req.files.video[0];

    // Upload poster to Cloudinary
    const posterUpload = await uploadToCloudinary(
      posterFile.buffer,
      "streamora/posters",
      "image"
    );

    // Upload video to Cloudinary
    const videoUpload = await uploadToCloudinary(
      videoFile.buffer,
      "streamora/videos",
      "video"
    );

    // Create movie in MongoDB
    const movie = await Movie.create({
      title,
      description,
      poster: posterUpload.secure_url,
      posterPublicId: posterUpload.public_id,
      videoUrl: videoUpload.secure_url,
      videoPublicId: videoUpload.public_id,
      genre,
      type,
      year,
      rating,
      duration,
      featured,
      uploadedBy, // IMPORTANT: owner of upload
    });

    res.status(201).json({
      message: "Movie uploaded successfully",
      movie,
    });
  } catch (error) {
    console.error("Error uploading movie:", error);
    res.status(500).json({
      message: "Failed to upload movie",
      error: error.message,
    });
  }
};

// ====================== DELETE MOVIE ======================
const deleteMovie = async (req, res) => {
  try {
    const { movieId, userId } = req.body;

    if (!movieId || !userId) {
      return res.status(400).json({
        message: "movieId and userId are required",
      });
    }

    const movie = await Movie.findById(movieId).populate("uploadedBy");

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    // Get current user from DB
    const currentUser = await User.findById(userId);

    if (!currentUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check permission:
    // allowed if uploader OR admin
    const isUploader = movie.uploadedBy && movie.uploadedBy._id.toString() === userId;
    const isAdmin = currentUser.role === "admin";

    if (!isUploader && !isAdmin) {
      return res.status(403).json({
        message: "You are not allowed to delete this movie",
      });
    }

    // Delete poster from Cloudinary
    if (movie.posterPublicId) {
      try {
        await cloudinary.uploader.destroy(movie.posterPublicId, {
          resource_type: "image",
        });
      } catch (cloudError) {
        console.warn("Failed to delete poster from Cloudinary:", cloudError.message);
      }
    }

    // Delete video from Cloudinary
    if (movie.videoPublicId) {
      try {
        await cloudinary.uploader.destroy(movie.videoPublicId, {
          resource_type: "video",
        });
      } catch (cloudError) {
        console.warn("Failed to delete video from Cloudinary:", cloudError.message);
      }
    }

    // Delete movie from MongoDB
    await Movie.findByIdAndDelete(movieId);

    // Optional: also remove watch progress records for this movie
    await WatchProgress.deleteMany({ movieId });

    res.json({
      message: "Movie deleted successfully from website and Cloudinary",
    });
  } catch (error) {
    console.error("Error deleting movie:", error);
    res.status(500).json({
      message: "Failed to delete movie",
      error: error.message,
    });
  }
};

// ====================== SAVE WATCH PROGRESS ======================
const saveProgress = async (req, res) => {
  try {
    const { userId, movieId, progress } = req.body;

    const existing = await WatchProgress.findOne({ userId, movieId });

    if (existing) {
      existing.progress = progress;
      await existing.save();

      return res.json({
        message: "Progress updated",
        progress: existing,
      });
    }

    const newProgress = await WatchProgress.create({
      userId,
      movieId,
      progress,
    });

    res.status(201).json({
      message: "Progress saved",
      progress: newProgress,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to save progress",
      error: error.message,
    });
  }
};

// ====================== GET PROGRESS FOR USER + MOVIE ======================
const getProgress = async (req, res) => {
  try {
    const { userId, movieId } = req.params;

    const progress = await WatchProgress.findOne({ userId, movieId });

    res.json(progress || { progress: 0 });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch progress",
      error: error.message,
    });
  }
};

// ====================== GET CONTINUE WATCHING ======================
const getContinueWatching = async (req, res) => {
  try {
    const { userId } = req.params;

    const progressList = await WatchProgress.find({ userId })
      .populate("movieId")
      .sort({ updatedAt: -1 });

    const formatted = progressList.map((item) => ({
      movie: item.movieId,
      progress: item.progress,
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch continue watching",
      error: error.message,
    });
  }
};

module.exports = {
  getMovies,
  getMovieById,
  addMovie,
  deleteMovie,
  saveProgress,
  getProgress,
  getContinueWatching,
};