"use client";

import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Howl } from "howler";

import { playNextSong, playPrevSong, shuffleSongs } from "@/redux/songSlice";
import { createImageLinks, formatArtist } from "@/lib/utils";

export const PlayerContext = createContext(null);

export const PlayerProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [seek, setSeek] = useState(0);
  const [volume, setVolume] = useState(0.1);

  const { currentSong } = useSelector((state) => state.song);

  const dispatch = useDispatch();

  const playerRef = useRef(null);
  const player = playerRef.current;
  const duration = player?.duration();

  useEffect(() => {
    if (!currentSong?.download_links) return;

    playerRef.current = new Howl({
      src: [currentSong.download_links[4]?.link],
      autoplay: true,
      html5: true,
      volume: 0.1,
      onplay: () => {
        setIsPlaying(true);
      },
      onpause: () => {
        setIsPlaying(false);
      },
      onend: () => {
        setSeek(0);
        setIsPlaying(false);
        dispatch(playNextSong());
      },
    });

    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentSong.title,
        artist: formatArtist(currentSong.more_info),
        artwork: createImageLinks(currentSong.image).map((image) => ({
          src: image.link,
          sizes: image.quality,
          type: `image/${image.link.split(".").pop()}`,
        })),
      });

      navigator.mediaSession.setActionHandler("play", () => {
        playerRef.current.play();
      });

      navigator.mediaSession.setActionHandler("pause", () => {
        playerRef.current.pause();
      });

      navigator.mediaSession.setActionHandler("nexttrack", () => {
        dispatch(playNextSong());
      });

      navigator.mediaSession.setActionHandler("previoustrack", () => {
        dispatch(playPrevSong());
      });

      navigator.mediaSession.setActionHandler("seekbackward", () => {
        playerRef.current.seek(playerRef.current.seek() - 10);
      });

      navigator.mediaSession.setActionHandler("seekforward", () => {
        playerRef.current.seek(playerRef.current.seek() + 10);
      });

      navigator.mediaSession.setActionHandler("seekto", (details) => {
        playerRef.current.seek(details.seekTime);
      });

      navigator.mediaSession.setActionHandler("stop", () => {
        playerRef.current.stop();
      });
    }

    return () => {
      playerRef.current?.unload();
    };
  }, [currentSong, dispatch]);

  useEffect(() => {
    if (player) {
      player.volume(volume);
    }
  }, [volume, player]);

  const updateProgress = useCallback(() => {
    if (player) {
      setSeek(player?.seek());
      requestAnimationFrame(updateProgress);
    }
  }, [player]);

  // update progress bar
  useEffect(() => {
    requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(updateProgress);
    };
  }, [currentSong, updateProgress]);

  const handleTogglePlay = () => {
    if (player) {
      if (isPlaying) {
        player.pause();
      } else {
        player.play();
      }
    }
  };

  const handleVolumeChange = (value) => {
    const newVolume = parseFloat(value);
    setVolume(newVolume);
  };

  const handleSeek = (value) => {
    const newPosition = parseFloat(value);
    setSeek(newPosition);
    if (player) {
      player.pause();
      player.seek(newPosition);
      player.play();
    }
  };

  const handleMute = () => {
    if (player) {
      if (volume > 0) {
        player.volume(0);
        setVolume(0);
      } else {
        player.volume(0.1);
        setVolume(0.1);
      }
    }
  };

  const handleNextSong = () => {
    if (player) {
      dispatch(playNextSong());
    }
  };

  const handlePrevSong = () => {
    if (player) {
      dispatch(playPrevSong());
    }
  };

  const handleShuffleSongs = () => {
    if (player) {
      dispatch(shuffleSongs());
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        isPlaying,
        seek,
        volume,
        duration,
        handleTogglePlay,
        handleVolumeChange,
        handleSeek,
        handleMute,
        handleNextSong,
        handlePrevSong,
        handleShuffleSongs,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
