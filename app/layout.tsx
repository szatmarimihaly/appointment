import type { Metadata } from "next";
import "./globals.css";
import { Rubik } from "next/font/google"
import { Arvo } from "next/font/google"

const arvoFont = Arvo({
  subsets: ["latin"],
  weight: "400"
})

const rubikFont = Rubik({
  subsets: ["latin"],
  weight : "400",
})



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${arvoFont.className}`}
      >
        {children}
      </body>
    </html>
  );
}
