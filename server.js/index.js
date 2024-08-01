import express from "express";

import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./src/routes/UserRotes.js";
import StudentRoute from "./src/routes/StudentRotes.js";
import InterviewRoute from "./src/routes/InterviewRoute.js";
import ResultRoutes from "./src/routes/ResultRoutes.js";
import CsvRoutes from "./src/routes/CsvConvertor.js";
import BatchRoter from "./src/routes/BatchRoute.js";

dotenv.config();
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:3000", // specify the origin you want to allow
  credentials: true, // enable set cookie
};
app.use(cors(corsOptions));

app.use("/api/user", router);
app.use("/api/student", StudentRoute);
app.use("/api/interviews", InterviewRoute);
app.use("/api/StudentResult", ResultRoutes);
app.use("/api/csv", CsvRoutes);
app.use("/api/batches", BatchRoter);
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
