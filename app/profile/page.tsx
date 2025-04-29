"use client";
import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { useClerk } from "@clerk/nextjs";

function Profile() {
  const { signOut } = useClerk();
  const [notification, setNotification] = useState<Notyf | null>(null);

  useEffect(() => {
    const notyfInstance = new Notyf({
      duration: 2000,
      position: { x: "right", y: "bottom" },
    });
    setNotification(notyfInstance);
  }, []);

  return (
    <div>
      <Navbar />
      <img src="/profile/profile-top.png" className="w-[100vw] " alt="" />
      <div className="flex flex-col items-center justify-center">
        <h1
          className="text-[7vw] text-[#FFB84D] mt-[-3vw]"
          style={{ fontFamily: "var(--font-mantinia)" }}
        >
          Bhavit Grover
        </h1>

        <div className="flex flex-col items-center justify-center mt-[5vw] gap-[5vw]">
          <img
            onClick={() => (window.location.href = "/reserve")}
            src="/profile/reserve.svg"
            className="w-[80vw]"
            alt=""
          />
          <img
            onClick={() => notification!.success("Coming Soon...")}
            src="/profile/previous-bills.svg"
            className="w-[80vw]"
            alt=""
          />
          <img
            onClick={() => notification!.success("Coming Soon...")}
            src="/profile/billing-details.svg"
            className="w-[80vw]"
            alt=""
          />
          <img
            onClick={() => signOut({ redirectUrl: "/sign-in" })}
            src="/profile/sign-out.svg"
            className="w-[80vw]"
            alt=""
          />
        </div>

        <div className="mt-[20vw] h-[20vw]"></div>
      </div>
    </div>
  );
}

export default Profile;
