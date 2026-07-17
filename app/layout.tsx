import type { Metadata } from "next";
import { Barlow_Condensed, Geist, Geist_Mono } from "next/font/google";
import MotionProvider from "./components/MotionProvider";
import SoundEvents from "./components/SoundEvents";
import CommandPalette from "./components/CommandPalette";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-cond",
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://karimkhalifeh.com"),
  title: {
    default: "Karim Khalifeh — full-stack developer, Beirut",
    template: "%s — karim khalifeh",
  },
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
      className={`dir-modern ${geistSans.variable} ${geistMono.variable} ${barlowCondensed.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SoundEvents />
        <MotionProvider>
          {children}
          <CommandPalette />
        </MotionProvider>
      </body>
    </html>
  );
}
