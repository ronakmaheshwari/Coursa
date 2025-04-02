import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import Signup from "./ui/pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./ui/pages/Signin";
import Dashboard from "./ui/pages/Dashboard";
import Purchase from "./ui/pages/Purchase";
import AdminSignup from "./ui/pages/AdminSignup";
import AdminSignin from "./ui/pages/AdminSignin";
import AdminDashboard from "./ui/pages/AdminDashboard";
import CreateCards from "./ui/components/CreateCard";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/purchase" element={<Purchase/>} />
          <Route path="/admin/signup" element={<AdminSignup/>} />
          <Route path="/admin/signin" element={<AdminSignin/>} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/create" element={<CreateCards />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
