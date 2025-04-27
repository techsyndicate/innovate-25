import type { Metadata } from "next";
import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { isMobile } from "@/utils/isMobile";
import { headers } from "next/headers";

const agmenaFont = localFont({
  src: [
    {
      path: "../public/fonts/Agmena Pro Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Agmena Pro Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-agmena",
});

const mantiniaFont = localFont({
  src: "../public/fonts/Mantinia.otf",
  variable: "--font-mantinia",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Lands Between",
  description: "Website for Innovate '25, made with <3 by TS.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userAgent = (await headers()).get("user-agent") || "";
  const mobileCheck = isMobile(userAgent);

  if (!mobileCheck) {
    return (
      <html lang="en">
        <body
          className={`${agmenaFont.className} font-light antialiased w-[100vw] h-[100vh] flex flex-col items-center justify-center`}
        >
          <h1 className="text-[15vw] text-[#FFB84D] font-black mb-0">400</h1>
          <div className="text-xl text-center">
            This website can only be opened on a Mobile device.
          </div>
        </body>
      </html>
    );
  }

  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${agmenaFont.variable} ${mantiniaFont.variable} ${agmenaFont.className} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
