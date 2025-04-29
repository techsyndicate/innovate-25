import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import React from "react";

function Confirmation() {
  return (
    <div className="h-[100vh]">
      <Navbar />
      <Header />
      <div className="flex flex-col w-[100%] h-[86vh] items-center">
        <img
          src="/menu/confirmation.svg"
          className="w-[100vw] mt-[30vw]"
          alt=""
        />
        <h1 className="text-[5vw] mt-[-9.25vh]">TABLE BOOKED</h1>
        <p className="text-[3.5vw] text-[rgba(255,255,255,0.2)] w-[40vw] text-center">
          CLAIM THE SEAT, OR IT IS LOST TO ANOTHER
        </p>
      </div>
    </div>
  );
}

export default Confirmation;
