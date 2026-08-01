import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "TailOS | Grooming Business Operating System",
  description: "CRM, scheduling, analytics, inventory, and customer experience for modern pet groomers."
};

const navigation = [
  ["Dashboard", "/"],
  ["Calendar", "/calendar"],
  ["Customers & Pets", "/customers"],
  ["Inventory", "/inventory"],
  ["Team", "/team"],
  ["Marketing", "/marketing"],
  ["Reports", "/reports"],
  ["Settings", "/settings"]
] as const;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="shell">
          <aside className="sidebar">
            <div className="brand">Tail<span>OS</span></div>
            <p className="muted">Grooming business intelligence</p>
            <nav className="nav" aria-label="Primary navigation">
              {navigation.map(([label, href], index) => (
                <Link className={index === 0 ? "active" : ""} href={href} key={href}>{label}</Link>
              ))}
            </nav>
          </aside>
          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  );
}
