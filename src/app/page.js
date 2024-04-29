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
      } else {
        router.push("/login");
      }
    }
  }, [isloading]);

  return <Loadingscreen />;
}
