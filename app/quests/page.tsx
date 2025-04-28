import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import React from "react";

function Quests() {
  return (
    <div>
      <Header />
      <Navbar />
      <div className="absolute top-[33vw] left-[10vw]">
        <div className="relative">
          <img src="./quests/dialogue-box.svg" className="w-[80vw] " alt="" />
          <div className="absolute top-[4vw] left-[4vw]">
            <p className="text-[3vw] w-[67vw]">Greetings Hunter,</p>
            <p className="text-[3vw] w-[67vw]">
              I am the Gladiator and I need your help; I have lost many ancient
              relics which have been passed down through various generations of
              my family. Find me these relics and I will grant you loads of XP.
            </p>
          </div>
          <p className="text-[4vw] absolute bottom-[10vw] right-[6vw] text-[#FFB84D]">
            Continue
          </p>
        </div>
      </div>
      <img src="./quests/starting-svg.svg" className="w-[100vw] " alt="" />
    </div>
  );
}

export default Quests;
