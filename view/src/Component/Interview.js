import React from "react";

const Interview = () => {
  return (
    <form>
      <div>
        <label>Student</label>
        <input type="text" name="student" required />
      </div>
      <div>
        <label>Date</label>
        <input type="date" name="date" required />
      </div>
      <div>
        <label>Result</label>
        <input type="text" name="result" required />
      </div>
      <button type="submit">Add Interview</button>
    </form>
  );
};

export default Interview;
