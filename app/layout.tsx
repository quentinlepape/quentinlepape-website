import "./globals.css";
import styles from "./layout.module.css";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import Sidebar from "./components/sidebar/Sidebar";
import { HighlightInit } from "@highlight-run/next/highlight-init";
import Script from "next/script";

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
    <>
      <html lang="en">
        <head>
          <Script id="Microsoft Clarity" type="text/javascript">
            {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "hqggis5sxv");`}
          </Script>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <Script id="Google Analytics" strategy="afterInteractive">
            {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                    });
                `}
          </Script>
          <Script id="Google Tag Manager">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WZFK6M5');`}</Script>
          <HighlightInit
            projectId={"odz433gp"}
            tracingOrigins
            enableCanvasRecording
            networkRecording={{
              enabled: true,
              recordHeadersAndBody: true,
              urlBlocklist: [],
            }}
          />
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
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-WZFK6M5"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
          <Sidebar />
          <div className="grow overflow-hidden">{children}</div>
          <Analytics />
        </body>
      </html>
    </>
  );
}
