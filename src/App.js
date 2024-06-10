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

  return (
    <Layout style={{ minHeight: "100vh", justifyContent: "center" }}>
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : // Render the appropriate dashboard based on the user's role and department
      user.role === "porter" ? (
        <PorterDashboard user={user} />
      ) : user.role === "admin" ? (
        <AdminDashboard user={user} />
      ) : (
        <Department1Dashboard user={user} />
      )}
    </Layout>
  );
}

export default App;
