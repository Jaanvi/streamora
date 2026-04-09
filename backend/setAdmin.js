require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const setAdmin = async (email) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    const user = await User.findOneAndUpdate(
      { email: email },
      { role: "admin" },
      { new: true }
    );

    if (user) {
      console.log(`User ${email} set to admin`);
    } else {
      console.log(`User ${email} not found`);
    }

    mongoose.disconnect();
  } catch (error) {
    console.error(error);
  }
};

// Replace with your admin email
setAdmin("your-admin-email@example.com");