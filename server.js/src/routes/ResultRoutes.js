import express from "express";
import Interview from "../model/InterviewModel.js";
import Result from "../model/ResultModel.js";
import Student from "../model/StudentModel.js";

const ResultRoutes = express.Router();

// get students their reslut for specific interview
ResultRoutes.get("/student/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const interview = await Interview.findById(id).populate(
      " allocatedStudents"
    );
    if (!interview)
      return res.status(404).json({ message: "Interview not found" });
    const results = await Result.find({ interview: id }).populate("student");

    // map student with their result

    const studentWithResult = interview.allocatedStudents.map((student) => {
      const result = results.find(
        (r) => r.student._id.toString() === student._id.toString()
      );
      return {
        ...student._doc,
        result: result ? result.result : "didn't attempt",
      };
    });
    res.json(studentWithResult);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Update the result for a student
ResultRoutes.put("/updateResult/:interviewId/:studentId", async (req, res) => {
  const { interviewId, studentId } = req.params;
  const { result } = req.body;

  try {
    // Find and update the result
    const updatedResult = await Result.findOneAndUpdate(
      { interview: interviewId, student: studentId }, // Query to find the document
      { result }, // Update operation
      { new: true } // Return the updated document
    );

    if (!updatedResult) {
      return res.status(404).json({ message: "Result not found" });
    }

    res.status(200).json(updatedResult);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default ResultRoutes;
