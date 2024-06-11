import React, { useState, useEffect } from "react";
import Login from "./login";
import PorterDashboard from "./porter/Dashboard";
import AdminDashboard from "./admin/Dashboard";
import Department1Dashboard from "./depart1/Dashboard";
import { Layout } from "antd";
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    const loginTime = sessionStorage.getItem("loginTime");

    if (storedUser && loginTime) {
      const twoHoursInMillis = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
      const currentTime = new Date().getTime();
      if (currentTime - parseInt(loginTime, 10) < twoHoursInMillis) {
        setUser(JSON.parse(storedUser));
      } else {
        // Clear user data if session has expired
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("loginTime");
      }
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    const loginTime = new Date().getTime().toString();
    sessionStorage.setItem("user", JSON.stringify(userData));
    sessionStorage.setItem("loginTime", loginTime);
  };

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("loginTime");
  };

  const renderDashboard = () => {
    if (!user) return null;
    if (user.department === "porter" && user.role === "admin") {
      return <PorterDashboard user={user} onLogout={handleLogout} />;
    }

    if (user.role === "admin" && user.department === "IT") {
      return <AdminDashboard user={user} onLogout={handleLogout} />;
    }
    if (user.department === "depart1" && user.role === "") {
      return <Department1Dashboard user={user} onLogout={handleLogout} />;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", justifyContent: "center" }}>
      {!user ? <Login onLogin={handleLogin} /> : renderDashboard()}
    </Layout>
  );
}

export default App;
