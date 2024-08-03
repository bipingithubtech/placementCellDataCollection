import React from "react";
import axios from "axios";
const Download = () => {
  const handleDownload = async () => {
    try {
      const response = await axios({
        url: "http://localhost:8000/api/csv/generateCsv",
        method: "GET",
        responseType: "blob",
      });
      // Create a URL for the file and trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "studentData.csv");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading the file", error);
    }
  };

  return <button onClick={handleDownload}>Download CSV</button>;
};

export default Download;
