import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar"; // Assuming you have this layout component
import Login from "./components/Login";
import Signup from "./components/Signup";

const App = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(() => {
    // Load user from localStorage if available
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    // Keep localStorage in sync
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  const handleAuthSubmit = (data) => {
    const user = {
      email: data.email,
      name: data.name || "User",
      // TEXT instead of avatar image:
      avatar: data.name?.[0]?.toUpperCase() || "U",
    };
    setCurrentUser(user);
    navigate("/", { replace: true });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    navigate("/login", { replace: true });
  };

  // ✅ Protected Layout wrapper
  const ProtectedLayout = () => {
    if (!currentUser) {
      navigate("/login");
      return null;
    }
    return (
      <>
        <Navbar user={currentUser} onLogout={handleLogout} />
        <Outlet />
      </>
    );
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Login
              onSubmit={handleAuthSubmit}
              onSwitchMode={() => navigate("/signup")}
            />
          </div>
        }
      />

      <Route
        path="/signup"
        element={
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Signup
              onSubmit={handleAuthSubmit}
              onSwitchMode={() => navigate("/login")}
            />
          </div>
        }
      />

      {/* Protected Routes */}
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<h1 className="p-6 text-xl">Welcome, {currentUser?.name}!</h1>} />
        {/* You can add more protected routes here */}
      </Route>
    </Routes>
  );
};

export default App;
