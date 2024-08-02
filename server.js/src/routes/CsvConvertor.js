import express from "express";
import fs from "fs";
import path from "path";
import { format } from "fast-csv";
import { fileURLToPath } from "url";

import Result from "../model/ResultModel.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CsvRoutes = express.Router();

CsvRoutes.get("/generateCsv", async (req, res) => {
  try {
    const results = await Result.find()
      .populate("student")
      .populate("interview");
    //   map results

    const CsvData = results.map((result) => {
      const student = result.student;
      const interview = result.interview;
      return {
        studentId: student._id,
        studentName: student.name,
        studentCollege: student.college,
        studentStatus: student.status,
        dsaFinalScore: student.courseScores.dsaFinalScore,
        webdFinalScore: student.courseScores.webdFinalScore,
        reactFinalScore: student.courseScores.reactFinalScore,
        InterviewCompany: interview.companyName,

        interviewStudentResult: result.result,
      };
    });
    // create csv file
    const csvStream = format({ headers: true });
    const filePath = path.join(__dirname, "studentData.csv");
    const writeStream = fs.createWriteStream(filePath);

    //  csv data to file
    csvStream.pipe(writeStream);
    CsvData.forEach((row) => csvStream.write(row));
    csvStream.end();

    // sending file to the clien
    writeStream.on("finish", () => {
      res.download(filePath, "studentData", (err) => {
        if (err) {
          res.status(500).json({ messgae: err.message });
        }
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default CsvRoutes;
