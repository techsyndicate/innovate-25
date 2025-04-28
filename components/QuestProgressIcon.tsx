"use client";
import React from "react";

function QuestProgressIcon({
  active,
  nextOne,
  children,
}: {
  active: Boolean;
  nextOne?: Boolean;
  children: string;
}) {
  return (
    <div
      className={`text-[#000] bg-[#ffb84d] [clip-path:polygon(50%_0%,100%_50%,50%_100%,0%_50%)] w-[10.5vw] h-[10.5vw] flex justify-center items-center text-lg`}
    >
      <div className={`${active ? "text-[#000] bg-transparent" : "text-[#fff] bg-[#080808]"} [clip-path:polygon(50%_0%,100%_50%,50%_100%,0%_50%)] w-[10vw] h-[10vw] flex justify-center items-center text-lg`}>
        {children}
      </div>
    </div>
  );
}

export default QuestProgressIcon;
