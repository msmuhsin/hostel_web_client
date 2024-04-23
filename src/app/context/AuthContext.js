"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext();
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isloading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadUserFromLocalStorage() {
      const token = localStorage.getItem("token");
      if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const { data } = await api.get("user/profile");
        if (data.user.email) {
          setUser({ email: data.user.email });
        }
      }
      setLoading(false);
    }

    loadUserFromLocalStorage();
  }, []);

  const login = async (data) => {
    try {
      const response = await api.post("/user/login", {
        email: data.email,
        password: data.password,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        api.defaults.headers.common["Authorization"] =
          `Bearer ${response.data.token}`;
        const { data } = await api.get("/user/profile");

        if (data.user.email) {
          setUser({ email: data.user.email });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    delete api.defaults.headers.common["Authorization"];
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isloading, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const ProtectedRoute = ({ children }) => {
  const pathname = usePathname();

  const { isAuthenticated, isloading } = useAuthContext();

  if (isloading || (!isAuthenticated && pathname !== "/login")) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-y-5">
        <h1>Loading...</h1>
      </div>
    );
  }
  return children;
};
