import express from "express";

import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "./src/routes/UserRotes.js";

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/user", router);
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.url); // Ensure correct env variable name
    console.log("DB connected successfully");
  } catch (error) {
    console.log("Error while connecting to DB", error); // Added error logging
  }
};

const port = process.env.PORT || 3000; // Default to port 3000 if not set
app.listen(port, () => {
  console.log(`Listening to port number ${port}`);
  connectDb();
});
