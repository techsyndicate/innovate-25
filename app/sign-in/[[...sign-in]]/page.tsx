"use client";

import * as React from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
// import { RainbowButton } from "@/components/RainbowButton";
import Loading from "@/components/Loading";
import "notyf/notyf.min.css";
import { Notyf } from "notyf";

export default function SignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      //@ts-ignore
      const signInAttempt = await signIn.create({
        identifier: email.trim(),
        password: password.trim(),
      });

      if (signInAttempt.status === "complete") {
        // @ts-ignore
        await setActive({ session: signInAttempt.createdSessionId });
        router.push("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      // setError(err.errors[0].message);
      notification!.error(err.errors[0].message);
      // console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col w-[100%] h-[100vh] items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] animate-fadeIn">
      <h1 className="text-2xl font-medium text-[#fff]">Welcome to</h1>
      <h1
        className="text-[9vw] mb-[5vw] font-medium text-[#FFB84D]"
        style={{ fontFamily: "var(--font-mantinia)" }}
      >
        The Lands Between
      </h1>
      <form
        className="flex flex-col items-center justify-center space-y-4"
        onSubmit={handleSubmit}
      >
        <Input
          name="Enter your email"
          value={email}
          type={"email"}
          callback={(e) => setEmail(e.target.value)}
        />
        <Input
          name="Enter your password"
          type={"password"}
          value={password}
          callback={(e) => setPassword(e.target.value)}
        />
        <img
          src="/login/go-ahead.svg"
          className="w-[33.753vw] mt-[5vw]"
          alt=""
          onClick={handleSubmit}
        />
        {/* {error && <p className="text-red-500 w-[60vw] text-center">{error}</p>} */}
        <p>
          Don&#39;t have an account?
          <Link className="font-bold text-[#FFB84D]" href={"/sign-up"}>
            &nbsp;Register
          </Link>
        </p>
      </form>
    </div>
  );
}
