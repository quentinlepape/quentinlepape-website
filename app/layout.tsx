import "./globals.css";
import styles from "./layout.module.css";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import Sidebar from "./components/sidebar/Sidebar";

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
