import express from "express";
import Interview from "../model/InterviewModel.js";

const InterviewRoute = express.Router();

// get all interview
InterviewRoute.get("/allInterview", async (req, res) => {
  try {
    const Interviews = await Interview.find()
      .populate("batchId")
      .populate(" allocatedStudents");
    res.status(200).json(Interviews);
  } catch (error) {
    res.status(500).json(error);
  }
});

// create an interview
InterviewRoute.post("/create", async (req, res) => {
  const { companyName, date, batchId } = req.body;
  try {
    const createInterview = await Interview({ companyName, date, batchId });
    const newInterview = await createInterview.save();
    res.status(201).json(newInterview);
  } catch (error) {
    res.status(400).json({ message: err.message });
  }
});

InterviewRoute.post("/allocate/:id", async (req, res) => {
  const { studentId } = req.body;
  const { id } = req.params;
  try {
    const interview = await Interview.findById(id);
    if (!interview)
      return res.status(404).json({ message: "Interview not found" });
    if (!interview.allocatedStudents.includes(studentId)) {
      interview.allocatedStudents.push(studentId);
      await interview.save();
    }
    res.json(interview);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});
// get interview details

InterviewRoute.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const detail = await Interview.findById(id)
      .populate("batchId")
      .populate("allocatedStudents");
    res.json(detail);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});

// update interview

InterviewRoute.put("updateInterview/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { companyName, date, batchId } = req.body;
    const findInterview = await Interview.findByIdAndUpdate(
      id,
      { companyName, date, batchId },
      { new: true }
    );
    const UpdatedInterView = await findInterview.save();
    res.status(200).json(UpdatedInterView);
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete Interview

InterviewRoute.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteInterview = await Interview.findByIdAndDelete(id);
    if (!deleteInterview)
      return res.status(404).json({ message: "Interview not found" });
    res.json({ message: "Interview deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});

export default InterviewRoute;
