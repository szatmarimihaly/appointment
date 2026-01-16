import type { Metadata } from "next";
import "./globals.css";
import { Rubik } from "next/font/google"

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
        className={`${rubikFont.className}`}
      >
        {children}
      </body>
    </html>
  );
}
