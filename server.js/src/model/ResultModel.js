import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  interview: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Interview",
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  result: {
    type: String,
    enum: ["PASS", "FAIL", "On Hold", "Didn't Attempt"],
    required: true,
  },
});

const Result = mongoose.model("Result", resultSchema);
export default Result;
