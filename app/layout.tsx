import type { Metadata } from "next";
import "./globals.css";
import Headbar from "../components/Headbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Xuecong Wang - Artist",
  description:
    "Portfolio of artist Xuecong Wang featuring artworks and blog posts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Headbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
