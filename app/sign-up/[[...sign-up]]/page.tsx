"use client";

import React, { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
// import { RainbowButton } from "@/components/RainbowButton";
import "notyf/notyf.min.css";
import { Notyf } from "notyf";

export default function Page() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState("");
  const router = useRouter();
  const { user } = useUser();
  const [notification, setNotification] = React.useState<Notyf | null>(null);

  React.useEffect(() => {
    const notyfInstance = new Notyf({
      duration: 2000,
      position: { x: "right", y: "bottom" },
    });
    setNotification(notyfInstance);
  }, []);

  React.useEffect(() => {
    if (isLoaded && user) {
      return router.push("/");
    }
  }, [isLoaded, user, router]);

  if (user) {
    return router.push("/");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress,
        password,
        firstName: fName.trim(),
        lastName: lName.trim(),
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setVerifying(true);
    } catch (err: any) {
      notification!.error(err.errors[err.errors.length - 1].message);
      // console.log("me gira hua banda", JSON.stringify(err, null, 2));
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailAddress.trim(),
            clerkId: signUpAttempt.createdUserId,
            name: fName.trim() + " " + lName.trim(),
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            console.log("Success:", data);
            router.push("/");
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err: any) {
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  };

  if (verifying) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[100vh]">
        <h1 className="text-3xl font-bold mb-9 text-[#fff]">
          Verify your email
        </h1>
        <form onSubmit={handleVerify} className="flex flex-col space-y-4">
          <Input
            name="Enter verification code"
            value={code}
            callback={(e) => setCode(e.target.value)}
          />
          <button
            className="flex flex-col items-center justify-center"
            type="submit"
          >
            <img
              src="/login/go-ahead.svg"
              className="w-[33.753vw] mt-[5vw]"
              alt=""
            />
          </button>
        </form>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[100vh] animate-fadeIn">
        <h1 className="text-2xl font-medium text-[#fff]">Welcome to</h1>
        <h1
          className="text-[9vw] mb-[5vw] font-medium text-[#FFB84D]"
          style={{ fontFamily: "var(--font-mantinia)" }}
        >
          The Lands Between
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <Input
            type="text"
            name="First Name"
            value={fName}
            callback={(e) => setFName(e.target.value)}
          />
          <Input
            type="text"
            name="Last Name"
            value={lName}
            callback={(e) => setLName(e.target.value)}
          />
          <Input
            type="email"
            name="Your email"
            value={emailAddress}
            callback={(e) => setEmailAddress(e.target.value)}
          />
          <Input
            type="password"
            name="Your password"
            value={password}
            callback={(e) => setPassword(e.target.value)}
          />
          <button
            className="flex flex-col items-center justify-center"
            type="submit"
          >
            <img
              src="/login/go-ahead.svg"
              className="w-[33.753vw] mt-[5vw]"
              alt=""
            />
          </button>
          {/* {error && <p className="text-red-500 w-[60vw]">{error}</p>} */}
          <p className="text-center">
            Already have an account?{" "}
            <Link className="font-bold text-[#FFB84D]" href={"/sign-in"}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
