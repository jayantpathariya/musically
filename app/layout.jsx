import { Figtree } from "next/font/google";

import ReduxProvider from "@/providers/redux-provider";
import { Sidebar } from "@/components/sidebar";
import { Player } from "@/components/player";
import { MobileNav } from "@/components/mobile-nav";
import { MobilePlayer } from "@/components/mobile-player";

import "./globals.css";
import "rc-slider/assets/index.css";
import { PlayerProvider } from "@/providers/player-provider";

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
          <div id="modal"></div>
          <div className="grid grid-cols-4 gap-3 md:p-3 ">
            <Sidebar />
            <main className="col-span-4 md:col-span-3 ">{children}</main>
          </div>
          <PlayerProvider>
            <Player />
            <MobilePlayer />
          </PlayerProvider>
          <MobileNav />
        </ReduxProvider>
      </body>
    </html>
  );
}
