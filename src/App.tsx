import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Login from "./components/LoginCard";
import Signup from "./components/Signup";
import Dashboard from "./pages/Home";
import Students from "./pages/Students";
import Courses from "./pages/Courses";
import DashboardLayout from "./components/DashboardLayout";
function Home() {
  const location = useLocation();

  const isSignup = location.pathname === "/signup";

  return (
    <div className="min-h-screen bg-back">
      <Navbar />

      <main className="container-custom">
        <div className="flex min-h-[calc(100vh-80px)] items-center justify-between gap-16">
          <Hero />

          {isSignup ? <Signup /> : <Login />}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Home />} />

      <Route element={<DashboardLayout />}>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/courses" element={<Courses />} />
      </Route>
    </Routes>
  );
}
