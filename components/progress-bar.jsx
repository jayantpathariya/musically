import Slider from "rc-slider";
import { useEffect } from "react";

export const ProgressBar = ({
  soundRef,
  seek,
  setSeek,
  handleSeek,
  currentSong,
}) => {
  useEffect(() => {
    const updateProgress = () => {
      if (soundRef.current) {
        setSeek(soundRef.current.seek());
      }
    };

    const animationId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <Slider
      className="mobile-slider"
      disabled={!currentSong?.title}
      styles={{
        track: { backgroundColor: "#fff", height: "2px" },
        rail: { backgroundColor: "#636363", height: "2px" },
        handle: { display: "none" },
      }}
      max={soundRef.current ? soundRef.current?.duration() : 100}
      step={0.01}
      value={seek}
      onChange={handleSeek}
    />
  );
};
