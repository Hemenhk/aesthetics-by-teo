import type { Metadata } from "next";
import { Inter, Noto_Sans } from "next/font/google";

import NextAuthProvider from "./context/next-auth";
import { ShopifyContextProvider } from "./context/store";

import TheHeader from "@/components/nav/TheHeader";
import TheAnnouncement from "@/components/announcement/TheAnnouncement";
import TheFooter from "@/components/footer/TheFooter";

import "./globals.css";
import MUIProvider from "./context/mui";
import ReactQueryProvider from "./context/react-query-client";

const inter = Inter({ subsets: ["latin"], variable: "--font-roboto-mono" });

const noto_sans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  display: "swap",
  weight: ["400", "500", "600"],
});

type Children = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Akkadian",
  description: "Ecommerce store for hair and beard products",
};

export default function RootLayout({ children }: Children) {
  const isNotAdmin = (
    <>
      <TheAnnouncement />
      <TheHeader />
      {children}
    </>
  );

  return (
    <html lang="en">
      <body className={`${inter.variable} ${noto_sans.variable}`}>
        <NextAuthProvider>
          <ReactQueryProvider>
            <MUIProvider>
              <ShopifyContextProvider>
                {isNotAdmin}
                <TheFooter />
              </ShopifyContextProvider>
            </MUIProvider>
          </ReactQueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
