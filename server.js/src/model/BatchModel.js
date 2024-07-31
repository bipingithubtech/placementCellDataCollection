import mongoose from "mongoose";

const batchSchema = new mongoose.Schema({
  batchName: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

const Batch = mongoose.model("Batch", batchSchema);

export default Batch;
