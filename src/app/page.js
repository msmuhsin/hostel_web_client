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
  <h1>Welcome to the Engineering college Thrissur</h1>
  <p>HOSTEL MANAGEMENT SYSTEM</p>
  <p>This is the automatic allotment system for college hostel admission </p>
  <Link href="/login">
    <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Go to Login Page
    </a>
     </Link>
    <img src="Downloads\Projects\hostel_web_client\src\app\images\mh.jpeg" alt="hostel image" />
    <img src="Downloads\Projects\hostel_web_client\src\app\images\hostel.jpg" alt="hostel image" />
    <img src="Downloads\Projects\hostel_web_client\src\app\images\gec-web-logo-new1.png" alt="hostel image" />
  </div>
  );
}
