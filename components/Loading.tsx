"use client";
import React, { useEffect, useState } from "react";

function Loading() {
  const [clockwiseRotation, setClockwiseRotation] = useState(0);
  const [counterRotation, setCounterRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setClockwiseRotation((prev) => (prev + 45) % 360);
      setCounterRotation((prev) => (prev - 45) % 360);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <img
        src="/loading/big.png"
        className="w-[66.378vw] aspect-square"
        alt=""
        style={{
          transform: `rotate(${clockwiseRotation}deg)`,
          transition: "transform 0.2s ease",
        }}
      />
      <img
        src="/loading/small.png"
        className="w-[24.384vw] absolute top-[21.1vw] left-[21vw] aspect-square"
        alt=""
        style={{
          transform: `rotate(${counterRotation}deg)`,
          transition: "transform 0.2s ease",
        }}
      />
    </div>
  );
}

export default Loading;
