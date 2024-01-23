import { Figtree } from "next/font/google";

import { Sidebar } from "@/components/sidebar";

import "./globals.css";

const font = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "Musically",
  description: "A music player",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <div className="grid grid-cols-4 gap-3 p-3">
          <Sidebar />
          <main className="col-span-4 md:col-span-3">{children}</main>
        </div>
      </body>
    </html>
  );
}
