import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import MotionProvider from "./components/MotionProvider";
import SoundEvents from "./components/SoundEvents";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://karimkhalifeh.com"),
  title: "Karim Khalifeh — full-stack developer, Beirut",
  description:
    "I'm Karim — a freelance full-stack developer based in Beirut. I build fast, well-engineered websites and web apps for businesses around the world.",
  openGraph: {
    type: "website",
    url: "/",
    siteName: "karim khalifeh",
    title: "Karim Khalifeh — full-stack developer, Beirut",
    description:
      "I'm Karim — a freelance full-stack developer based in Beirut. I build fast, well-engineered websites and web apps for businesses around the world.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karim Khalifeh — full-stack developer, Beirut",
    description:
      "I'm Karim — a freelance full-stack developer based in Beirut. I build fast, well-engineered websites and web apps for businesses around the world.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dir-modern ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SoundEvents />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
