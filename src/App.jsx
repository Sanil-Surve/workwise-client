import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateEmployee from "./pages/CreateEmployee";
import EmployeeList from "./pages/EmployeeList";
import UpdateEmployee from "./pages/updateEmployee";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/create-employee" element={<CreateEmployee />} exact/>
        <Route path="/list" element={<EmployeeList />} exact/>
        <Route path="/update-employee/:id" element={<UpdateEmployee />} exact/>
        <Route path="/home" element={<Home />} exact/>
        <Route path="/" element={<SignUp />} exact/>
        <Route path="/login" element={<Login />} exact/>
      </Routes>
    </Router>
  );
};

export default App;
