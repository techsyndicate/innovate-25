"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "notyf/notyf.min.css";
import { Notyf } from "notyf";
import { MongoUser } from "@/types/MongoUser";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import { useClerk } from "@clerk/nextjs";

function Profile() {
  const { signOut } = useClerk();
  const [notification, setNotification] = useState<Notyf | null>(null);
  const { isLoaded, user } = useUser();
  const router = useRouter();
  const [mongoUser, setMongoUser] = useState({} as MongoUser);
  const [mongoUserLoading, setMongoUserLoading] = useState(true);

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
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <img src="/profile/profile-top.png" className="w-[100vw] " alt="" />
      <div className="flex flex-col items-center justify-center">
        <h1
          className="text-[7vw] text-[#FFB84D] mt-[-3vw]"
          style={{ fontFamily: "var(--font-mantinia)" }}
        >
          {mongoUser.name}
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
