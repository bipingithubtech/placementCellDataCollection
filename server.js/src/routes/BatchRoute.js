import express from "express";
import Batch from "../model/BatchModel.js";
const BatchRoter = express.Router();

BatchRoter.post("/create", async (req, res) => {
  const { batchName, startDate, endDate, course } = req.body;
  try {
    if (!batchName || !startDate || !endDate || !course) {
      return res.status(400).json({ message: "Data is missing" });
    }
    const batch = new Batch({ batchName, startDate, endDate, course });
    const newBatch = await batch.save();
    res.status(200).json(newBatch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// get all batches

BatchRoter.get("/", async (req, res) => {
  try {
    const batches = await Batch.find();
    res.status(200).json(batches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default BatchRoter;
