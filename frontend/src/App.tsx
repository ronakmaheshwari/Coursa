import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import Signup from "./ui/pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./ui/pages/Signin";
import Dashboard from "./ui/pages/Dashboard";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
