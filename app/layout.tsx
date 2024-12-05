import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mr Lee",
  description: "TCM Chiropractor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-gray-800">
      <head>
        <meta name="google-adsense-account" content="ca-pub-7522199614879430" />
        <meta name="robots" content="index, follow" />
        <meta
          name="google-site-verification"
          content="H1nvL6JpGoAp4WDht0GyA59rnbICK5ADqB9lgw2i59o"
        />
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-BQEFECH8GR"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-BQEFECH8GR');
            `,
          }}
        />
      </body>
    </html>
  );
}
