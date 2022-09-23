import logo from './logo.svg';
import './App.css';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Samplecollection from './Components/Samplecollection/Samplecollection';
import Attendance from './Components/Attendance/Attendance'
import { Route, Routes } from "react-router-dom"
import { BrowserRouter as Router } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/samplecollection" element={<Samplecollection />}></Route>
        <Route path="/attendance" element={<Attendance />}></Route>
      </Routes>
    </Router>
    // <Attendance/>
  );
}

export default App;
