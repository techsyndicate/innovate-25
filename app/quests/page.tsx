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
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

function Quests() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const { isLoaded, user } = useUser();
  const router = useRouter();
  const [mongoUser, setMongoUser] = useState({} as MongoUser);
  const [mongoUserLoading, setMongoUserLoading] = useState(true);
  const [questsLoading, setQuestsLoading] = useState(true);
  const [quests, setQuests] = useState<any[]>([]);
  const [notification, setNotification] = useState<Notyf | null>(null);

  useEffect(() => {
    const notyfInstance = new Notyf({
      duration: 2000,
      position: { x: "right", y: "bottom" },
    });
    setNotification(notyfInstance);
  }, []);

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
          setCurrentLevel(Math.max(0, ...data.user.completedQuests));
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
          notification!.error("Something went wrong. Please try again.");
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
          notification!.error("Something went wrong. Please try again.");
        }
      });
  };

  const handleQuestComplete = () => {
    if (window.confirm("Are you sure you want to complete this quest?")) {
      fetch('/api/quest/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: mongoUser.email,
          level: currentLevel+1
        })
      })
      .then(resp => resp.json())
      .then(data => {
        if (!data.success) {
          alert(data.message)
        } else {
          window.location.reload()
        }
      })
    } else {
      console.log('na ho jave')
    }
  }

  if (!mongoUser.seenQuests) {
    return (
      <div>
        <Header />
        <Navbar />
        <div className="absolute top-[33vw] left-[10vw]">
          <div className="relative">
            <img src="./quest/dialogue-box.svg" className="w-[80vw] " alt="" />
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
        <img src="./quest/starting-svg.svg" className="w-[100vw] " alt="" />
      </div>
    );
  }

  console.log(quests);

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
        <div
          className="fixed left-0 bottom-0 w-[100vw] h-[40vh] z-[1]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.7), black)",
            pointerEvents: "none",
          }}
        ></div>
        <div className="relative w-[85vw] h-[30vw] mt-[10vw]" onClick={() => handleQuestComplete()}>
          <img
            src="/quest/grey_box.svg"
            className="absolute top-0 left-0 w-[85vw]"
          ></img>
          <img
            src={`/quest/quest${currentLevel + 1}.svg`}
            className="w-[41.75vw] absolute top-[0.25vw] left-0"
          ></img>
          <div className="absolute w-[55vw] top-[4vw] right-[4vw] flex flex-col items-end">
            <h1 className="text-[3vw] text-[#939393]">IN PROGRESS</h1>
            <h1
              className="mb-[1vw]"
              style={{ fontFamily: "var(--font-mantinia)" }}
            >
              {quests[currentLevel].title}
            </h1>
            <p className="text-right text-[2vw]">
              {quests[currentLevel].description}
            </p>
          </div>
          <div
            className="bg-[#ffb84d] absolute left-[7.5vw] bottom-[-3vw] w-[12vw] h-[5vw] text-[2vw] flex items-center justify-center text-[#000]"
            style={{
              clipPath:
                "polygon(10% 0, 90% 0, 100% 20%, 100% 80%, 90% 100%, 10% 100%, 0 80%, 0 20%)",
            }}
          >
            QUEST {currentLevel + 1}
          </div>
        </div>
        {mongoUser.completedQuests.map((quest) => (
          <div className="relative w-[85vw] h-[30vw] mt-[10vw]">
            <img
              src="/quest/orange_box.svg"
              className="absolute top-0 left-0 w-[85vw]"
            ></img>
            <img
              key={quest}
              src={`/quest/quest${quest}.svg`}
              className="w-[41.75vw] absolute top-[0.25vw] left-0"
            ></img>
            <div className="absolute w-[55vw] top-[4vw] right-[4vw] flex flex-col items-end">
              <h1 className="text-[3vw] text-[#ffb84d]">COMPLETED</h1>
              <h1
                className="mb-[1vw]"
                style={{ fontFamily: "var(--font-mantinia)" }}
              >
                {quests[quest - 1].title}
              </h1>
              <p className="text-right text-[2vw]">
                {quests[quest - 1].description}
              </p>
            </div>
            <div
              className="bg-[#ffb84d] absolute left-[7.5vw] bottom-[-3vw] w-[12vw] h-[5vw] text-[2vw] flex items-center justify-center text-[#000]"
              style={{
                clipPath:
                  "polygon(10% 0, 90% 0, 100% 20%, 100% 80%, 90% 100%, 10% 100%, 0 80%, 0 20%)",
              }}
            >
              QUEST {quest}
            </div>
          </div>
        ))}
      </div>
      <div className="h-[20vh]"></div>
    </div>
  );
}

export default Quests;
