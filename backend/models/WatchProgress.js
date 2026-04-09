const mongoose = require("mongoose");

const watchProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    progress: {
      type: Number, // seconds
      default: 0,
    },
  },
  { timestamps: true }
);

watchProgressSchema.index({ userId: 1, movieId: 1 }, { unique: true });

module.exports = mongoose.model("WatchProgress", watchProgressSchema);