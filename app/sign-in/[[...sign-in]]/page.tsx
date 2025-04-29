"use client";

import * as React from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { RainbowButton } from "@/components/RainbowButton";

export default function SignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const { user } = useUser();

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
      setError(err.errors[0].message);
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col w-[100%] h-[100vh] items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] animate-fadeIn">
      <img
        src="./login_blob.png"
        className="w-[41%] aspect-auto absolute top-[-1vh] left-[-3vh] z-[-10]"
        alt=""
      />

      <img
        src="./login_blob_2.png"
        className="w-[44%] aspect-auto absolute bottom-[2vh] right-[-2vh] z-[-10]"
        alt=""
      />

      <h1 className="text-2xl mb-0 font-medium text-[#fff]">Welcome to</h1>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
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
        <RainbowButton height="7vh" classes="rounded-full" type="submit">
          Login
        </RainbowButton>
        {error && <p className="text-red-500">{error}</p>}
        <p>
          Don&#39;t have an account?
          <Link className="font-bold text-[#651DFF]" href={"/sign-up"}>
            &nbsp;Register
          </Link>
        </p>
      </form>
    </div>
  );
}
