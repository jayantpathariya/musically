"use client";

import { useSelector } from "react-redux";

import { Table } from "@/components/table";

const QueuePage = () => {
  const { currentSong, songs, index } = useSelector((state) => state.song);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Queue</h1>
      <h2 className="font-bold text-neutral-400">Now playing</h2>
      <div className="mt-2">
        <Table playlist={[currentSong]} showHeader={false} />
      </div>
      {songs.length > 0 && (
        <div className="mt-8">
          <h2 className="font-bold text-neutral-400 mb-2">Next up</h2>
          <Table
            playlist={songs.slice(index + 1)}
            startIndex={2}
            showHeader={false}
          />
        </div>
      )}
    </div>
  );
};

export default QueuePage;
