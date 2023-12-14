const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Successfully connected to Mongo DB");
  } catch (error) {
    console.log("Mongo DB Connection ERROR");
    console.log(error);
  }
};

module.exports = connectDB;
