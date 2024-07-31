import mongoose from "mongoose";
const interviewSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  date: { type: Date, required: true },
  batchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Batch",
    required: true,
  },
  allocatedStudents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
});

const Interview = mongoose.model("Interview", interviewSchema);
export default Interview;
