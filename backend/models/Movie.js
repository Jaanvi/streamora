const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    // Poster URL from Cloudinary
    poster: {
      type: String,
      required: true,
    },

    // Poster Cloudinary public_id
    posterPublicId: {
      type: String,
      required: true,
    },

    // Video URL from Cloudinary
    videoUrl: {
      type: String,
      required: true,
    },

    // Video Cloudinary public_id
    videoPublicId: {
      type: String,
      required: true,
    },

    genre: {
      type: String,
      enum: [
        "Action",
        "Comedy",
        "Drama",
        "Thriller",
        "Romance",
        "Horror",
        "SciFi",
        "Documentary",
      ],
      required: true,
    },

    // movie or tv
    type: {
      type: String,
      enum: ["movie", "tv"],
      required: true,
      default: "movie",
    },

    year: {
      type: Number,
      required: true,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 10,
    },

    duration: {
      type: String,
      default: "2h 00m",
    },

    featured: {
      type: Boolean,
      default: false,
    },

    // Who uploaded it
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);