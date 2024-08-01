import express from "express";
import Student from "../model/StudentModel.js";

const StudentRoute = express.Router();

StudentRoute.post("/create", async (req, res) => {
  const { name, college, status, batchId } = req.body;
  try {
    if (!name || !college || !status) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const Students = new Student({ name, college, status, batchId });
    const newStudent = await Students.save();
    res.status(200).json(newStudent);
  } catch (error) {
    res.status(400).send(error);
  }
});

StudentRoute.get("/getall", async (req, res) => {
  try {
    const getStudent = await Student.find({});
    res.json(getStudent);
  } catch (error) {
    res.status(200).send(error);
  }
});

StudentRoute.put("/Update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateStudent = await Student.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

StudentRoute.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params.id;
    const deleteStudent = await Student.findByIdAndDelete(id);
    if (!deleteStudent)
      return res.status(404).json({ message: "Interview not found" });
    res.status(200).json("student remove sucessfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

export default StudentRoute;
