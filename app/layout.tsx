import type { Metadata } from "next";
import { Montserrat, Inter, Space_Grotesk, Syne, Outfit, Pacifico } from 'next/font/google';
import "./globals.css";

const montserrat = Montserrat({ subsets: ['latin'], variable: "--font-montserrat", weight: ['400', '700', '900'] });
const inter = Inter({ subsets: ['latin'], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: "--font-space-grotesk" });
const syne = Syne({ subsets: ['latin'], variable: "--font-syne" });
const outfit = Outfit({ subsets: ['latin'], variable: "--font-outfit" });
const pacifico = Pacifico({ subsets: ['latin'], variable: "--font-pacifico", weight: '400' });

export const metadata: Metadata = {
  title: "Socials | Creator Platform",
  description: "Your digital storefront and links in one place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${inter.variable} ${spaceGrotesk.variable} ${syne.variable} ${outfit.variable} ${pacifico.variable} ${montserrat.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

