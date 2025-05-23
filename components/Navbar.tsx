"use client";
import React, { useState, useEffect } from "react";
import "notyf/notyf.min.css";
import { Notyf } from "notyf";
import { usePathname } from "next/navigation";

function Navbar() {
  const [showCard, setShowCard] = useState(false);
  const [notification, setNotification] = useState<Notyf | null>(null);
  const pathname = usePathname();

  let page = "";

  switch (pathname) {
    case "/":
      page = "Home";
      break;
    case "/menu":
    case "/order-details":
    case "/order-details/confirmation":
      page = "Menu";
      break;
    case "/profile":
    case "/reserve":
    case "/reserve/confirmation":
      page = "Profile";
      break;
    case "/quests":
      page = "Quests";
      break;
    default:
      page = "404";
      break;
  }

  useEffect(() => {
    const notyfInstance = new Notyf({
      duration: 2000,
      position: { x: "right", y: "bottom" },
    });
    setNotification(notyfInstance);
  }, []);

  if (showCard) {
    return (
      <div className="fixed z-[15] w-[100vw] bottom-0">
        <img
          src="/navbar/cross.svg"
          className="absolute bottom-[78vw] left-[3vw] z-[14] w-[10vw] pointer-cursor"
          alt=""
          onClick={() => setShowCard(!showCard)}
        />
        <img
          src="/navbar/card.svg"
          className="absolute bottom-0 z-[10] w-[100vw]"
          style={{ pointerEvents: "none" }}
          alt=""
        />
        <div className="absolute bottom-[53.1vw] left-[12vw] z-[11]">
          <h1
            style={{
              fontFamily: "var(--font-mantinia)",
              background: "linear-gradient(180deg, #FFB84D 0%, #996E2E 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            className="text-[#FFB84D] text-[8vw] m-0"
          >
            GOLD
          </h1>
          <h1
            style={{
              fontFamily: "var(--font-mantinia)",
            }}
            className="text-[4vw] m-0 mt-[-2vw]"
          >
            BHAVIT GROVER
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed z-[2] bottom-[7vh] left-[10vw]">
      {showCard && (
        <div className="relative mb-[-10vh] w-[100vw] bottom-0">
          <img
            src="/navbar/cross.svg"
            className="absolute bottom-[35.4vh] left-[-7vw] z-[14] w-[10vw]"
            style={{ pointerEvents: "none" }}
            alt=""
            onClick={() => console.log("clicked")}
          />
          <img
            src="/navbar/card.svg"
            className="absolute bottom-[-8vh] left-[-10vw] z-[10] w-[100vw]"
            style={{ pointerEvents: "none" }}
            alt=""
          />
          <div className="absolute bottom-[23vh] left-[5vw] z-[11]">
            <h1
              style={{
                fontFamily: "var(--font-mantinia)",
                background: "linear-gradient(180deg, #FFB84D 0%, #996E2E 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              className="text-[#FFB84D] text-[8vw] m-0"
            >
              GOLD
            </h1>
            <h1
              style={{
                fontFamily: "var(--font-mantinia)",
              }}
              className="text-[4vw] m-0 mt-[-2vw]"
            >
              BHAVIT GROVER
            </h1>
          </div>
        </div>
      )}
      <div className="relative ">
        <img src="/navbar/nav.svg" className="w-[80vw] " alt="" />
        <div className="flex flex-row justify-between absolute top-[-1.563vh] w-[60vw] left-[10vw]">
          <img
            src={
              page === "Home" ? "/navbar/active/home.svg" : `/navbar/home.svg`
            }
            className="w-[4.5vw]"
            onClick={() => (window.location.href = "/")}
            alt=""
          />
          <img
            src={
              page === "Menu" ? "/navbar/active/menu.svg" : `/navbar/order.svg`
            }
            className="w-[4.8vw]"
            onClick={() => (window.location.href = "/menu")}
            alt=""
          />
          <img
            src={`/navbar/key.svg`}
            className="w-[20vw]"
            onClick={() => notification!.success("Coming Soon...")}
            alt=""
          />
          <img
            src={
              page === "Quests"
                ? "/navbar/active/quests.svg"
                : `/navbar/merch.svg`
            }
            className="w-[4.7vw]"
            onClick={() => (window.location.href = "/quests")}
            alt=""
          />
          <img
            src={
              page === "Profile"
                ? "/navbar/active/profile.svg"
                : `/navbar/profile.svg`
            }
            className="w-[6.3vw]"
            onClick={() => (window.location.href = "/profile")}
            alt=""
          />
        </div>
      </div>
      <img
        src="/navbar/gradient.svg"
        className="fixed bottom-0 left-[0vw] z-[-5]"
        style={{ pointerEvents: "none" }}
        alt=""
      />
    </div>
  );
}

export default Navbar;
