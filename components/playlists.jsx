"use client";

import useEmblaCarousel from "embla-carousel-react";

import { createImageLinks, formatArtist, getLink } from "@/lib/utils";
import { PlaylistCard } from "./playlist-card";

export const Playlists = ({ title, playlists }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: "auto",
    containScroll: "trimSnaps",
  });

  return (
    <div className="mb-8 last:mb-0">
      <h2 className="text-2xl font-bold mb-3">{title}</h2>
      {/* <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4"> */}
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container flex gap-x-4">
            {playlists?.map((playlist) => {
              return (
                <div
                  className="embla__slide shrink-0 basis-[48%] md:basis-[32%] lg:basis-[24%] xl:basis-[19%]"
                  key={playlist.id}
                >
                  <PlaylistCard
                    id={playlist.id}
                    link={getLink(playlist)}
                    title={playlist.title}
                    image={createImageLinks(playlist.image)[2]?.link}
                    subtitle={
                      formatArtist(playlist?.more_info) || playlist?.subtitle
                    }
                    type={playlist.type}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};
