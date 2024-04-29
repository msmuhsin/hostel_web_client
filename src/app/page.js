"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthContext } from "./context/AuthContext";
import Loadingscreen from "./components/Loadingscreen";

export default function App() {
  const router = useRouter();
  const { isAuthenticated, isloading } = useAuthContext();

  useEffect(() => {
    if (!isloading) {
      if (isAuthenticated) {
        router.push("/dashboard");
      }
    }
  }, [isloading]);

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <h1>Governemnt Engineering College, Thrissur</h1>
    </div>
  );
}
