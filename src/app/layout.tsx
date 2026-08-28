import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KitchenOS",
  description:
    "KitchenOS is the operating system for your food life. Photograph your fridge, plate, and receipt — inventory, nutrition, spend, and waste on one dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
