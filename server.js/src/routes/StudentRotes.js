import express from "express";
import Student from "../model/StudentModel.js";

const StudentRoute = express.Router();

StudentRoute.post("/create", async (req, res) => {
  const { name, college, status, courseScores, batchId } = req.body;
  try {
    if (!name || !college || !status) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const Students = new Student({
      name,
      college,
      status,
      courseScores,
      batchId,
    });
    const newStudent = await Students.save();
    res.status(200).json(newStudent);
  } catch (error) {
    res.status(400).send(error);
  }
});

StudentRoute.get("/getall", async (req, res) => {
  try {
    const getStudent = await Student.find().populate("batchId");
    res.json(getStudent);
  } catch (error) {
    res.status(200).send(error);
  }
});

StudentRoute.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  console.log("ID:", id);
  console.log("Update Data:", updateData);

  try {
    if (!id) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const updateStudent = await Student.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updateStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(updateStudent);
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

StudentRoute.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteStudent = await Student.findByIdAndDelete(id);
    if (!deleteStudent)
      return res.status(404).json({ message: "Interview not found" });
    res.status(200).json("student remove sucessfully");
  } catch (error) {
    res.status(500).json(error);
  }
});
// get one student

StudentRoute.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default StudentRoute;
