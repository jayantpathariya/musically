import { PlayerContext } from "@/providers/player-provider";
import { useContext } from "react";

export const usePlayer = () => {
  const context = useContext(PlayerContext);

  if (context === undefined) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }

  return context;
};
