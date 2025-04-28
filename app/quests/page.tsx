"use client";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";
import { PacmanLoader } from "react-spinners";
import { MongoUser } from "@/types/MongoUser";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

function Quests() {
  const { isLoaded, user } = useUser();
  const router = useRouter();
  const [mongoUser, setMongoUser] = useState({} as MongoUser);
  const [mongoUserLoading, setMongoUserLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;

    fetch("/api/getUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user?.primaryEmailAddress?.emailAddress }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setMongoUserLoading(false);
          setMongoUser(data.user);
        } else {
          console.error("An error occured while fetching user.");
          setMongoUserLoading(false);
          return router.push("/sign-in");
        }
      });
  }, [isLoaded, user]);

  if (!isLoaded || mongoUserLoading) {
    return (
      <div className="flex flex-col w-[100%] h-[100vh] items-center justify-center">
        <PacmanLoader className="justify-center items-center" color="#651DFF" />
      </div>
    );
  }
  const handleContinue = () => {
    console.log("Clicked on continue button");
    fetch("/api/setContinueClicked", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: mongoUser._id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Clicked on continue button");
        } else {
          alert("Failed to register click.");
        }
      });
  };

  if (!mongoUser.seenQuests) {
    return (
      <div>
        <Header />
        <Navbar />
        <div className="absolute top-[33vw] left-[10vw]">
          <div className="relative">
            <img src="./quests/dialogue-box.svg" className="w-[80vw] " alt="" />
            <div className="absolute top-[4vw] left-[4vw]">
              <p className="text-[3.25vw] w-[72vw]">Greetings Hunter,</p>
              <p className="text-[3.25vw] w-[72vw]">
                I am the Gladiator and I need your help; I have lost many
                ancient relics which have been passed down through various
                generations of my family. Find me these relics and I will grant
                you loads of XP.
              </p>
            </div>
            <p
              onClick={() => handleContinue()}
              className="text-[4vw] absolute bottom-[10vw] right-[6vw] text-[#FFB84D]"
            >
              Continue
            </p>
          </div>
        </div>
        <img src="./quests/starting-svg.svg" className="w-[100vw] " alt="" />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <Navbar />
    </div>
  );
}

export default Quests;
