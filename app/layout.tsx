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
    default: "Karim Khalifeh — senior full-stack developer",
    template: "%s — karim khalifeh",
  },
  description:
    "Senior full-stack developer in Beirut — Laravel, React, Node, and applied AI. Four years owning the backend of a ~1,000-user publishing platform. Open to remote senior roles.",
  openGraph: {
    type: "website",
    url: "/",
    siteName: "karim khalifeh",
    title: "Karim Khalifeh — senior full-stack developer",
    description:
      "Senior full-stack developer in Beirut — Laravel, React, Node, and applied AI. Four years owning the backend of a ~1,000-user publishing platform. Open to remote senior roles.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karim Khalifeh — senior full-stack developer",
    description:
      "Senior full-stack developer in Beirut — Laravel, React, Node, and applied AI. Four years owning the backend of a ~1,000-user publishing platform. Open to remote senior roles.",
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
