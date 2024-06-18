import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import Login from "./login";
import PorterDashboard from "./porter/Dashboard";
import Porter from "./porter/Porter";
import AdminDashboard from "./admin/Dashboard";
import Department1Dashboard from "./depart1/Dashboard";
import { Routes } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    const loginTime = sessionStorage.getItem("loginTime");

    if (storedUser && loginTime) {
      const twoHoursInMillis = 8 * 60 * 60 * 1000; // 8 hours in milliseconds
      const currentTime = new Date().getTime();

      if (currentTime - parseInt(loginTime, 10) < twoHoursInMillis) {
        setUser(JSON.parse(storedUser));
      } else {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("loginTime");
      }
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData));
    sessionStorage.setItem("loginTime", new Date().getTime().toString());
  };

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("loginTime");
  };

  const renderDashboard = () => {
    if (!user) return null;

    const { department, role } = user;

    if (department === "porter") {
      if (role === "admin") {
        return <PorterDashboard user={user} onLogout={handleLogout} />;
      }
      return <Porter user={user} onLogout={handleLogout} />;
    }

    if (role === "admin" && department === "IT") {
      return <AdminDashboard user={user} onLogout={handleLogout} />;
    }

    if (department === "depart1" && role === "") {
      return <Department1Dashboard user={user} onLogout={handleLogout} />;
    }

    return null;
  };

  return (
   
    <Layout style={{ minHeight: "100vh", justifyContent: "center" }}>
      {!user ? <Login onLogin={handleLogin} /> : renderDashboard()}
    </Layout>
  );
}

export default App;
