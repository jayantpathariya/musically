import { Figtree } from "next/font/google";

import { Sidebar } from "@/components/sidebar";
import { Player } from "@/components/player";
import ReduxProvider from "@/providers/redux-provider";

import "./globals.css";
import "rc-slider/assets/index.css";

const font = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "Musically",
  description: "A music player",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ReduxProvider>
          <div className="grid grid-cols-4 gap-3 p-3">
            <Sidebar />
            <main className="col-span-4 md:col-span-3">{children}</main>
          </div>
          <Player />
        </ReduxProvider>
      </body>
    </html>
  );
}
