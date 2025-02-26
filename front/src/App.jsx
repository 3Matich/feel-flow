import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { clearAuthData } from "./api/services/session";

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    JSON.parse(sessionStorage.getItem("isAuthenticated")) || false
  );
  console.log("Autenticado: ", sessionStorage.getItem("isAuthenticated"))

  console.log(isAuthenticated);

  const handleLogin = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem("isAuthenticated", JSON.stringify(true));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("isAuthenticated");
    clearAuthData()
  };
  return (
    <Routes>
      {isAuthenticated ? (
        <>
          <Route path="/dashboard/*" element={<Dashboard onLogout={handleLogout} />} />
          <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
        </>
      ) : (
        <>
          <Route path="/auth/*" element={<Auth onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/auth/sign-in-new" replace />} />
        </>
      )}
    </Routes>
  );
}

export default App;
