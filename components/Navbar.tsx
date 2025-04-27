"use client";
import React from "react";

function Navbar() {
  return (
    <div className="fixed z-[2] bottom-[7vh] left-[10vw]">
      <div className="relative ">
        <img src="./navbar/nav.svg" className="w-[80vw] " alt="" />
        <div className="flex flex-row justify-between absolute top-[-1.563vh] w-[60vw] left-[10vw]">
          <img
            src="./navbar/home.svg"
            className="w-[4.5vw]"
            onClick={() => (window.location.href = "/")}
            alt=""
          />
          <img
            src="./navbar/order.svg"
            className="w-[4.8vw]"
            onClick={() => (window.location.href = "/menu")}
            alt=""
          />
          <img
            src="./navbar/key.svg"
            className="w-[20vw]"
            onClick={() => (window.location.href = "/")}
            alt=""
          />
          <img
            src="./navbar/merch.svg"
            className="w-[4.7vw]"
            onClick={() => (window.location.href = "/merch")}
            alt=""
          />
          <img
            src="./navbar/profile.svg"
            className="w-[6.3vw]"
            onClick={() => (window.location.href = "/")}
            alt=""
          />
        </div>
      </div>
      <img
        src="./navbar/gradient.svg"
        className="fixed bottom-0 left-[0vw] z-[-5]"
        alt=""
      />
    </div>
  );
}

export default Navbar;
