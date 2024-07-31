import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  college: { type: String, required: true },
  status: { type: String, enum: ["placed", "not_placed"], required: true },
  courseScores: {
    dsaFinalScore: { type: Number },
    webdFinalScore: { type: Number },
    reactFinalScore: { type: Number },
  },
  batchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Batch",
    required: true,
  },
});

const Student = mongoose.model("Student", studentSchema);
export default Student;
