import type { Metadata } from "next";
import { Cinzel, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Moroccan Craft Works | Authentic Moroccan Handicrafts for Global Markets",
  description:
    "A trusted Moroccan supplier for importers, retailers, hotels and designers. Handmade rugs, pottery, zellige, brass lanterns, leather goods and custom manufacturing with worldwide export.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col antialiased bg-moroccan-cream text-moroccan-dark selection:bg-moroccan-gold/25 selection:text-moroccan-dark">
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
