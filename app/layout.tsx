import Link from "next/link";
import "./globals.css";
import styles from "./layout.module.css";
import localFont from "next/font/local";
import Image from "next/image";
import logo from "./images/logo.svg";
import LocationsList from "./components/LocationsList";
import InteractiveGlobe from "./components/globe/InteractiveGlobe";

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
      <body className={`${satoshi.className} flex flex-row bg-light`}>
        <div
          className={`${styles.sidebarWrapper} relative h-full grow-0 shrink-0`}
        >
          <div
            className={`${styles.sidebar} fixed h-full p-10 flex flex-col justify-between bg-white border-r border-solid border-color`}
          >
            <nav>
              <Link
                href="/"
                className="flex flex-row items-center gap-3 text-XS text-bold text-faded text-uppercase"
              >
                <Image src={logo} alt="Logo for Quentin Le Pape's website" />
                Quentin Le Pape
              </Link>
            </nav>
            <section>
              <div className={styles.locationsListSection}>
                <h2 className="mb-2">Work locations</h2>
                <LocationsList></LocationsList>
              </div>
              <div className={styles.globeWrapper}>
                <InteractiveGlobe />
              </div>
            </section>
          </div>
        </div>
        <div className="grow overflow-hidden">{children}</div>
      </body>
    </html>
  );
}
