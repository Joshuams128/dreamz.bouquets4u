import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Dreamz Bouquets — Handcrafted Eternal Ribbon Bouquets",
  description:
    "Beautiful handmade eternal ribbon bouquets by Keerthi & Shyla. Made to order in Canada. Follow us on Instagram @dreamz.bouquets4.",
  keywords: "ribbon bouquets, handmade bouquets, eternal bouquets, Canada, custom bouquets",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-warm-white text-black antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
