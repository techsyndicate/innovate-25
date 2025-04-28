"use client";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";
import { MongoUser } from "@/types/MongoUser";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import QuestProgressIcon from "@/components/QuestProgressIcon";
import Quest from "@/models/questSchema";
import Loading from "@/components/Loading";

function Quests() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const { isLoaded, user } = useUser();
  const router = useRouter();
  const [mongoUser, setMongoUser] = useState({} as MongoUser);
  const [mongoUserLoading, setMongoUserLoading] = useState(true);
  const [questsLoading, setQuestsLoading] = useState(true);
  const [quests, setQuests] = useState([]);

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
          setCurrentLevel(Math.max(...data.user.completedQuests));
        } else {
          console.error("An error occured while fetching user.");
          setMongoUserLoading(false);
          return router.push("/sign-in");
        }
      });

    fetch("/api/quest/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success) {
          setQuests(data.quests);
          setQuestsLoading(false);
        } else {
          alert("Something went wrong. Please try again.");
          window.location.reload();
        }
      });
  }, [isLoaded, user]);

  if (!isLoaded || mongoUserLoading || questsLoading) {
    return (
      <div className="flex flex-col w-[100%] h-[100vh] items-center justify-center">
        <Loading />
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
          window.location.reload();
        } else {
          alert("Something went wrong. Please try again.");
        }
      });
  };

  // fetch('/api/questComplete', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     email: mongoUser.email,
  //     level: 1
  //   })
  // })
  // .then(resp => resp.json())
  // .then(data => {
  //   if (!data.success) {
  //     alert(data.message)
  //   } else {
  //     window.location.reload()
  //   }
  // })

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
      <div className="w-[85vw] ml-[7.5vw] mt-[1.5vh]">
        <h1
          className="text-[#ffb84d] text-5xl"
          style={{ fontFamily: "var(--font-mantinia)" }}
        >
          Quests
        </h1>
        <div className="w-[85vw] flex justify-between items-center mt-[4vh]">
          <div className="absolute w-[75vw] h-[4vw] bg-[#fff] left-[12.5vw] opacity-[0.05]"></div>
          <div
            className="absolute h-[2vw] bg-[#ffb84d] left-[12.5vw] opacity-[0.15]"
            style={{ width: `${18.75 * (currentLevel - 1)}vw` }}
          ></div>
          <QuestProgressIcon active={currentLevel >= 1 ? true : false}>
            1
          </QuestProgressIcon>
          <QuestProgressIcon active={currentLevel >= 2 ? true : false}>
            2
          </QuestProgressIcon>
          <QuestProgressIcon active={currentLevel >= 3 ? true : false}>
            3
          </QuestProgressIcon>
          <QuestProgressIcon active={currentLevel >= 4 ? true : false}>
            4
          </QuestProgressIcon>
          <QuestProgressIcon active={currentLevel >= 5 ? true : false}>
            5
          </QuestProgressIcon>
        </div>
        {quests.map(
          (quest: {
            title: string;
            description: string;
            questNumber: number;
          }) => (
            <img
              src={`/quests/quest${quest.questNumber}.png`}
              className="w-[85vw]"
            ></img>
          )
        )}
      </div>
    </div>
  );
}

export default Quests;
