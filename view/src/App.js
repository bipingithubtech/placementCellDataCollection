import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Component/Home";

import SignUp from "./Component/SignUp";
import Navbar from "./Component/Navbar";
import { UserProvider } from "./Store/ContextApi";
import Login from "./Component/Login";
import InterviewList from "./Component/Interview";
import Interview from "./Component/Interview";
import StudentList from "./Component/StudentList";
import AddStudent from "./Component/AddStudent";
import BatchList from "./Component/BatchList";
import UpdateStudent from "./Component/UpdateStudent";
import ListInterview from "./Component/ListInterview";
import CreteResult from "./Component/CreteResult";
import Download from "./Component/Download";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<SignUp />}></Route>
          <Route path="/interviews/add" element={<Interview />}></Route>
          <Route path="/studentList" element={<StudentList />}></Route>
          <Route path="/addStudent" element={<AddStudent />}></Route>
          <Route path="/batch" element={<BatchList />}></Route>
          <Route path="/updatePage/:id" element={<UpdateStudent />}></Route>
          <Route path="/listInterview" element={<ListInterview />}></Route>
          <Route path="/createResult" element={<CreteResult />}></Route>
          <Route path="/downloadcsv" element={<Download />}>
            {" "}
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
