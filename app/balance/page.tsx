"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PacmanLoader } from "react-spinners";
import "notyf/notyf.min.css";
import { MongoUser } from "@/types/MongoUser";

function Balance() {
  const { isLoaded, user } = useUser();
  const router = useRouter();
  const [mongoUser, setMongoUser] = useState({} as MongoUser);
  const [mongoUserLoading, setMongoUserLoading] = useState(true);
  const [amount, setAmount] = useState(0);

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

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value) {
      setAmount(parseInt(value));
    } else {
      setAmount(0);
    }
  };

  const handleBalanceAdd = () => {
    if (amount > 0) {
      fetch("/api/addBalance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: mongoUser._id, amount }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.url) {
            window.location.href = data.url;
          } else {
            alert("Failed to create checkout session.");
          }
        });
    } else {
      alert("Please enter a valid amount.");
    }
  };

  return (
    <div>
      <h1>Add balance to your card</h1>

      <p>Enter the amount to add</p>
      <input
        type="number"
        placeholder="Enter amount"
        onChange={(e) => handleAmountChange(e)}
      />
      <br />
      <button onClick={handleBalanceAdd}>Add Balance</button>
    </div>
  );
}

export default Balance;
