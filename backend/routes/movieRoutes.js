const router = require("express").Router();
const upload = require("../middleware/upload.middleware");

const {
  getMovies,
  addMovie,
  getMoviesByGenre,
  getMovieById,
  getMoviesByType,
  searchMovies,
  saveProgress,
  getProgress,
  getContinueWatching,
  deleteMovie,
} = require("../controllers/movieController");

router.delete("/delete", deleteMovie);
// get all movies
router.get("/", getMovies);

// get single movie
router.get("/:id", getMovieById);

// upload movie with poster + video
router.post("/upload", (req, res, next) => {
  upload.fields([
    { name: "poster", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ])(req, res, (err) => {
    if (err) {
      console.error("Upload middleware error:", err);
      return res.status(400).json({ message: err.message || "Upload failed" });
    }
    next();
  });
}, addMovie);

// save watch progress
router.post("/progress", saveProgress);

// get progress of one movie
router.get("/progress/:userId/:movieId", getProgress);

// continue watching list
router.get("/continue/:userId", getContinueWatching);

module.exports = router;