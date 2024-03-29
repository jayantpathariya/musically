"use client";

import { useSelector } from "react-redux";

import { Table } from "@/components/table";
import { HiOutlineQueueList } from "react-icons/hi2";

const QueuePage = () => {
  const { currentSong, songs, index } = useSelector((state) => state.song);

  console.log(songs);

  if (!currentSong?.title && !songs?.length) {
    return (
      <div className="h-full flex items-center justify-center flex-col">
        <HiOutlineQueueList className="text-6xl text-neutral-300" />
        <h1 className="text-3xl font-bold">Add to your queue</h1>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Queue</h1>
      <h2 className="font-bold text-neutral-400">Now playing</h2>
      <div className="mt-2">
        <Table
          playlist={[currentSong]}
          showHeader={false}
          playlistName="Queue"
        />
      </div>
      {songs.length > 1 && (
        <div className="mt-8">
          <h2 className="font-bold text-neutral-400 mb-2">Next up</h2>
          <Table
            playlist={songs.slice(index + 1)}
            startIndex={2}
            showHeader={false}
            playlistName="Queue"
          />
        </div>
      )}
    </div>
  );
};

export default QueuePage;
