import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TailOS Grooming | From Muddy to Magnificent",
  description: "A premium dog grooming website powered by TailOS booking, CRM, and salon operations."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
