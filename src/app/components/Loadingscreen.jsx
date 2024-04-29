"use client";

import React from "react";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";

const Loadingscreen = () => {
  const { isloading } = useAuthContext();
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    let timer;
    if (isloading) {
      const startTime = new Date().getTime();
      timer = setInterval(() => {
        const elapsedTime = new Date().getTime() - startTime;
        const progress = Math.min((elapsedTime / 5000) * 100, 100);
        setProgressValue(progress);
      }, 50);
    } else {
      setProgressValue(100);
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isloading]);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-y-5 w-screen">
      <span>Loading...</span>
      <div className="w-1/3">
        <Progress value={progressValue} />
      </div>
    </div>
  );
};

export default Loadingscreen;
