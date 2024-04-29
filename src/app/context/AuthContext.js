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
      router.push("/");
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
          router.push("/dashboard");
        }
      } else if (response.data.success == false) {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed please try again later..", {
        position: "top-right",
      });
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
  const { isloading, isAuthenticated } = useAuthContext();

  if (isloading && (!isAuthenticated || pathname === "/login")) {
    return <Loadingscreen />;
  }

  if (!isAuthenticated && pathname !== "/login") {
    return null;
  }

  return children;
};
