"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function App() {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-y-5">
      <h1>Redirecting...</h1>
    </div>
  );
}
