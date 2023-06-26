import "./globals.css";
import styles from "./layout.module.css";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import Sidebar from "./components/sidebar/Sidebar";
import Head from "next/head";

const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.woff2",
  display: "swap",
  weight: "300 700",
  style: "normal",
});

export const metadata = {
  title: "Quentin Le Pape",
  description: "Full-Stack Developer, Product Design Leader, Serial Founder.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#333333" />
        <meta name="msapplication-TileColor" content="#f6f7fa" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={`${satoshi.className} ${styles.body} flex flex-row bg-light`}
      >
        <Sidebar />
        <div className="grow overflow-hidden">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
