import React from "react";
import { IVideo } from "../models/IVideo";
import { IGenre } from "../models/IGenre";
import Card from "./Card";

interface Props {
  videos: IVideo[];
  genres: IGenre[];
}

const VideoResults: React.FC<Props> = ({ videos, genres }) => {
  const genresDict: { [id: number]: string } = {};
  genres.forEach((genre) => {
    genresDict[genre.id] = genre.name;
  });

  return videos.length == 0 ? (
    <div className="text-6xl p-10 my-10 text-center border-8 border-sky-500">
      <p>No videos were found!</p>
      <p>Please try another search</p>
    </div>
  ) : (
    <div className="flex flex-wrap justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {videos.map((video) => (
          <Card
            key={video.id}
            title={video.title}
            imageUrl={video.image_url}
            artist={video.artist}
            release_year={video.release_year}
            genre={genresDict[video.genre_id]}
            imageWidth={150}
            imageHeight={150}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoResults;
