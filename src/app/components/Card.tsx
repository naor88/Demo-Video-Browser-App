import Image from "next/image";
import React from "react";

interface CardProps {
  title: string;
  artist: string;
  genre: string;
  release_year: number;
  imageUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
}

const Card: React.FC<CardProps> = ({
  title,
  artist,
  genre,
  release_year,
  imageUrl,
  imageWidth,
  imageHeight,
}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-slate-400">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={title}
          className="w-full"
          width={imageWidth}
          height={imageHeight}
        />
      )}
      <div className="px-6 py-4 text-center">
        <div className="font-bold text-xl mb-2">{title}</div>
        <div className="text-gray-700 text-base">{artist}</div>
        <div className="text-gray-700 text-base">{release_year}</div>
        <div className="text-gray-700 text-base">{genre}</div>
      </div>
    </div>
  );
};

export default Card;
