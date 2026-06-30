import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import MotionProvider from "./components/MotionProvider";
import SmoothScrollProvider from "./components/scroll/SmoothScrollProvider";
// Lenis base styles — neutralizes the html `height:100%` and native
// scroll-behavior so smooth scroll isn't fighting the layout.
import "lenis/dist/lenis.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display serif for the editorial direction. Optical sizing + heavier
// weights for big magazine-style headlines.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Karim Khalifeh — full-stack developer, Beirut",
  description:
    "I'm Karim — a freelance full-stack developer based in Beirut. I build fast, well-engineered websites and web apps for businesses around the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dir-modern ${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <MotionProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
