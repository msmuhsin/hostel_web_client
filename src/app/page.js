"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Link } from "next/link";
import Image from "next/image";
import { useAuthContext } from "./context/AuthContext";
import { Button } from "@/components/ui/button";

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
    <div className="h-screen w-screen flex items-center justify-center absolute overflow-hidden">
      <div className="flex flex-col z-20 text-center items-center mt-20 text-">
        <h1 className="text-4xl font-extrabold mb-4">
          Welcome to Engineering College Thrissur
        </h1>
        <p className="text-lg mb-4">HOSTEL MANAGEMENT SYSTEM</p>
        <p className="text-lg mb-8">
          This is the automatic allotment system for college hostel admission
        </p>
        <Button
          variant="secondary"
          className="w-36 font-bold"
          onClick={() => router.push("/login")}
        >
          Go to Login
        </Button>
      </div>
      <div className="absolute inset-0 flex items-center  z-10 flex-col ">
        <div className="bg-[#790000] w-full flex items-center justify-center">
          <Image
            src="/images/gec-web-logo-new1.png"
            alt="hostel image"
            width={700}
            height={700}
            // add a dark filter to the image
            className="object-cover "
          />
        </div>
        <div className="w-full flex justify-center">
          <Image
            src="/images/hostel.jpg"
            alt="hostel image"
            className="filter brightness-50 contrast-75 blur-[1px] object-cover"
            width={2000}
            height={2000}
          />
        </div>
      </div>
    </div>
  );
}
