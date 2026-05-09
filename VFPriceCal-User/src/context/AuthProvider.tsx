import React, { useState, type ReactNode } from "react";
import { login } from "../service/AuthService";
import { AuthContext } from "./AuthContext";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [role, setRole] = useState<string | null>(
    localStorage.getItem("role")
  );

  const [username, setUsername] = useState<string | null>(
    localStorage.getItem("username")
  );

  const loginUser = async (u: string, p: string) => {
    const data = await login(u, p);

    localStorage.setItem("username", u);

    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    if (data.permission) {
      localStorage.setItem("role", data.permission);
    }

    setUsername(u);
    setRole(data.permission);

    return data;
  };

  const logoutUser = () => {
    localStorage.clear();
    setRole(null);
    setUsername(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{ role, username, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};