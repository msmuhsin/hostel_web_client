"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthContext } from "./context/AuthContext";

export default function App() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthContext();

  useEffect(() => {
    router.push(user ? "/dashboard" : "/login");
  }, [isAuthenticated, user]);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-y-5">
      <h1>Redirecting...</h1>
    </div>
  );
}
