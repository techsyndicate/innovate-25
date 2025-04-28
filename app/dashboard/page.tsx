"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "notyf/notyf.min.css";
import { Notyf } from "notyf";
import { MongoUser } from "@/types/MongoUser";
import Loading from "@/components/Loading";

function Dashboard() {
  const { isLoaded, user } = useUser();
  const router = useRouter();
  const [mongoUser, setMongoUser] = useState({} as MongoUser);
  const [mongoUserLoading, setMongoUserLoading] = useState(true);
  // const notyf = new Notyf();

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
      <h1>Dashboard</h1>
      <p>Hi {mongoUser.name}</p>
    </div>
  );
}

export default Dashboard;
