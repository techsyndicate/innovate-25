"use client";

import React from "react";
import { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { useParams } from "next/navigation";
import AiMessage from "@/components/AiMessage";
import MyMessage from "@/components/MyMessage";
import Head from "next/head";

const getResponse = async (prompt: string, character: string) => {
  const res = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: prompt, character: character }),
  });
  const data = await res.json();
  if (!data.error) {
    console.log(data);
    return data.candidates[0].content.parts[0].text;
  } else {
    return;
  }
};

function aiPage() {
  const params = useParams();
  const character = params.slug;
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("Output appears here!");
  const [messageSending, setMessageSending] = useState(false)
  const [messageReceiving, setMessageReceiving] = useState(false)

  const getResponseText = () => {
    setMessageSending(true)
    setMessageReceiving(false)
    getResponse(inputValue, character as string).then(
      (resp: string | undefined) => {
        setInputValue("")
        setOutputValue(resp ? resp : "There was an error, please try again.");
        setMessageSending(false)
        setMessageReceiving(true)
      }
    );
  };

  // return (
  //   <div>
  //     <textarea onChange={(e) => setInputValue(e.target.value)}></textarea>
  //     <button
  //       onClick={() => {
  //         getResponseText();
  //       }}
  //     >
  //       Do it
  //     </button>
  //     <p>{outputValue}</p>
  //   </div>
  // );

  if (
    character &&
    ["ranni", "godrick", "morgott", "mohg"].includes(
      (character as string).toLowerCase()
    )
  ) {
    return (
      <div>
        <Header />
        { messageSending ? (
        <div className="flex absolute justify-between align-center w-[15vw] left-[42.5vw] bottom-[30vw]">
          <div
            className="w-[2vw] h-[2vw] bg-[#333]"
            style={{
              animationName: "bounce",
              animationDuration: "1s",
              animationIterationCount: "infinite",
              animationDelay: "0s",
              animationTimingFunction: "linear",
            }}
          ></div>
          <div
            className="w-[2vw] h-[2vw] bg-[#333]"
            style={{
              animationName: "bounce",
              animationDuration: "1s",
              animationIterationCount: "infinite",
              animationDelay: "0.25s",
              animationTimingFunction: "linear",
            }}
          ></div>
          <div
            className="w-[2vw] h-[2vw] bg-[#333]"
            style={{
              animationName: "bounce",
              animationDuration: "1s",
              animationIterationCount: "infinite",
              animationDelay: "0.5s",
              animationTimingFunction: "linear",
            }}
          ></div>
          <div
            className="w-[2vw] h-[2vw] bg-[#333]"
            style={{
              animationName: "bounce",
              animationDuration: "1s",
              animationIterationCount: "infinite",
              animationDelay: "0.75s",
              animationTimingFunction: "linear",
            }}
          ></div>
        </div>
        ) : (<></>)}
        { messageSending ? (<MyMessage>{inputValue}</MyMessage>) : (<></>) }
        { messageReceiving ? (<AiMessage>{outputValue}</AiMessage>) : (<></>) }
        <img
          src="/navbar/nav2.svg"
          className=" fixed w-[80vw] left-[10vw] bottom-[10vw]"
        ></img>
        <img
          onClick={() => getResponseText()}
          src="/home/sendButton.png"
          className="fixed w-[15vw] right-[15vw] bottom-[12.5vw]"
        ></img>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={`Talk with ${
            (character as string).charAt(0).toUpperCase() + character.slice(1)
          }:`}
          className="outline-none box-border px-[8vw] w-[65vw] left-[10vw] bottom-[10vw] fixed h-[13.333333vw]"
        ></input>
        <img
          src="/home/homepage_header.png"
          className="absolute top-0 left-0 w-[100vw] z-[-1]"
        ></img>
        <img
          src={`/home/${character}.png`}
          className="w-[100vw] h-[80vw]"
        ></img>
      </div>
    );
  } else {
    return (
      <div>
        <Header />
        <Navbar />
        <p className="text-center">Invalid URL.</p>
      </div>
    );
  }
}

export default aiPage;
