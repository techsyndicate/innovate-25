"use client";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import React, { useState, TouchEvent } from "react";

export default function Home() {
  const [activeImage, setActiveImage] = useState(1);
  const [leftPercent, setLeftPercent] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;
  const aiAgents = ['Morgott', "Ranni", "Godrick", "Mohg"]

  const onTouchStart = (e: any) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: any) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isRightSwipe = distance < -minSwipeDistance;
    const isLeftSwipe = distance > minSwipeDistance;
    if (isLeftSwipe) {
      if (leftPercent < 300) {
        setLeftPercent(leftPercent + 100);
        setActiveImage(activeImage + 1);
      }
    }
    if (isRightSwipe) {
      if (leftPercent >= 100) {
        setLeftPercent(leftPercent - 100);
        setActiveImage(activeImage - 1);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <Header />
      <img
        src="/home/homepage_header.png"
        className="absolute top-0 left-0 w-[100vw] z-[-1]"
      ></img>
      <div className="w-[100vw] flex h-[80vw] overflow-x-hidden">
        <img
          src="/home/morgott.png"
          className={`w-[100vw] h-[80vw] [transition:0.3s]`}
          style={{ transform: `translateX(${-leftPercent}vw)` }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        ></img>
        <img
          src="/home/ranni.png"
          className={`w-[100vw] h-[80vw] [transition:0.3s]`}
          style={{ transform: `translateX(${-leftPercent}vw)` }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        ></img>
        <img
          src="/home/godrick.png"
          className={`w-[100vw] h-[80vw] [transition:0.3s]`}
          style={{ transform: `translateX(${-leftPercent}vw)` }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        ></img>
        <img
          src="/home/mohg.png"
          className={`w-[100vw] h-[80vw] [transition:0.3s]`}
          style={{ transform: `translateX(${-leftPercent}vw)` }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        ></img>
      </div>
      <img
        src="/home/button.png"
        className="w-[25vw] h-[7.5vw] absolute left-[37.5vw] top-[85vw]"
      ></img>
      <div className="top-[85vw] text-[2.75vw] absolute w-[100vw] flex justify-center">
        <div className="w-[25vw] h-[7.5vw] flex justify-center items-center">
          {`Talk with ${aiAgents[activeImage-1]}`}
        </div>
      </div>
      <div className="top-[93.5vw] absolute left-[40vw] w-[20vw] flex items-center justify-center">
        <div
          className={`sliderButton ${
            activeImage == 1 ? "activeSliderButton" : "inactiveSliderButton"
          }`}
        ></div>
        <div
          className={`sliderButton ${
            activeImage == 2 ? "activeSliderButton" : "inactiveSliderButton"
          }`}
        ></div>
        <div
          className={`sliderButton ${
            activeImage == 3 ? "activeSliderButton" : "inactiveSliderButton"
          }`}
        ></div>
        <div
          className={`sliderButton ${
            activeImage == 4 ? "activeSliderButton" : "inactiveSliderButton"
          }`}
        ></div>
      </div>
      <div className="w-[80vw] flex ml-[10vw] my-[2vh] justify-between">
          <div>
            <h1 className="text-lg">UPCOMING RESERVATION</h1>
            <div className="flex items-center gap-[1vw] text-[#999]">
              <img src="/home/location.png" className="w-[3vw]"></img>
              <p className="text-[3vw]">Morgott's Omen King Tandoor, Chandigarh</p>
            </div>
          </div>
          <h1 className="text-4xl text-[#ffb84d]">12:45</h1>
      </div>
      <img src="/home/navigate_banner.png" className="mb-[20vh]"></img>
    </div>
  );
}
