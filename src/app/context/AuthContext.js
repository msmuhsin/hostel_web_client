"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
import api from "@/lib/api";
import { usePathname, useRouter } from "next/navigation";
import Loadingscreen from "../components/Loadingscreen";
import toast from "react-hot-toast";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isloading, setLoading] = useState(true);
  const router = useRouter();

  async function loadUserFromLocalStorage() {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      setLoading(false);
      return;
    }

    try {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const { data } = await api.get("user/profile");
      if (data && data.user && data.user.email) {
        setUser({ email: data.user.email });
      } else {
        console.error("User email not found in profile data");
      }
    } catch (error) {
      console.error("Error loading user profile:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // Load user profile data from local storage when component mounts
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
          toast.success("Logged in successfully", {
            position: "top-right",
          });
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
  const router = useRouter();
  const { isloading, isAuthenticated } = useAuthContext();

  if (isloading && (!isAuthenticated || pathname === "/login")) {
    return <Loadingscreen />;
  }

  return isAuthenticated ? children : router.push("/login");
};
