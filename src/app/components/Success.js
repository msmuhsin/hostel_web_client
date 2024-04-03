import React from "react";
import Lottie from "react-lottie";
import successanimation from "/public/assets/success.json";
import failedanimation from "/public/assets/failed.json";

const Success = ({ Status, Text }) => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: Status === "success" ? successanimation : failedanimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="w-full text-center">
      <h4 className="text-2xl sm:text-3xl font-bold pt-8">{Status}</h4>
      <p className="text-sm pt-1">{Text}</p>
      <Lottie options={defaultOptions} height={150} width={200} />
    </div>
  );
};

export default Success;
