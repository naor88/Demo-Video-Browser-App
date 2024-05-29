"use client";
import Header from "./components/Header";
import SearchSection from "./components/SearchSection";
import VideoResults from "./components/VideoResults";
import { useCallback, useEffect, useState, useTransition } from "react";

import { IVideo } from "./models/IVideo";
import { IGenre } from "./models/IGenre";
// import { data } from "./data";

const WithoutGenre = "Without Genre";

const APIs = {
  getVideos:
    "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json",
};

const filterVideosByText = (videos: IVideo[], text?: string): IVideo[] => {
  if (!text) return videos;

  const lowerCaseText = text.toLowerCase();

  return videos.filter((video) => {
    const hasTitle = video.title && typeof video.title === "string";
    const hasArtist = video.artist && typeof video.artist === "string";

    const matchesTitle =
      hasTitle && video.title.toLowerCase().includes(lowerCaseText);
    const matchesArtist =
      hasArtist && video.artist.toLowerCase().includes(lowerCaseText);

    return matchesTitle || matchesArtist;
  });
};

const filterVideosByYear = (videos: IVideo[], year?: number) => {
  return year ? videos.filter((v) => v.release_year == year) : videos;
};

const filterVideosByGenres = (
  videos: IVideo[],
  allExistGenresIds: number[],
  selectedGenresId?: number[]
) => {
  const withoutAnyGenre = selectedGenresId?.includes(-1);
  return selectedGenresId?.length
    ? videos.filter(
        (v) =>
          selectedGenresId.includes(v.genre_id) ||
          (withoutAnyGenre && !allExistGenresIds.includes(v.genre_id))
      )
    : videos;
};

const filterVideos = (
  videos: IVideo[],
  allExistGenresIds: number[],
  queryText?: string,
  year?: number,
  genresId?: number[]
) => {
  return filterVideosByGenres(
    filterVideosByYear(filterVideosByText(videos, queryText), year),
    allExistGenresIds,
    genresId
  );
};

export default function Home() {
  const [errorMsg, setErrorMsg] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | undefined>();
  const [selectedGenresIds, setSelectedGenresIds] = useState<number[]>([]);
  const [selectedQueryText, setSelectedQueryText] = useState("");
  const [filteredVideos, setFilteredVideos] = useState<IVideo[]>(videos);

  useEffect(() => {
    const abortController = new AbortController();
    setIsFetching(true);

    const fetchData = async () => {
      try {
        const response = await fetch(APIs.getVideos, {
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const { videos = [], genres = [] } = data;
        setVideos(videos);
        setFilteredVideos(videos);
        setGenres(genres);
      } catch (error: unknown) {
        if (error instanceof Error) {
          if (error.name !== "AbortError") {
            // Check if the error is not due to the abort
            setErrorMsg("Error fetching data: " + error.message);
          }
        } else {
          setErrorMsg("An unknown error occurred");
        }
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    const filteredResults = filterVideos(
      videos,
      genres.map((g) => g.id),
      selectedQueryText,
      selectedYear,
      selectedGenresIds
    );
    setFilteredVideos(filteredResults);
  }, [videos, genres, selectedQueryText, selectedYear, selectedGenresIds]);

  const onSelectGenres = useCallback(
    (genreNames: string[]) => {
      const newSelectedGenresIds = [
        ...(genreNames.includes(WithoutGenre) ? [-1] : []),
        ...genres
          .filter((genre) => genreNames.includes(genre.name))
          .map((g) => g.id),
      ];
      setSelectedGenresIds(newSelectedGenresIds);
    },
    [genres, setSelectedGenresIds]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    setSelectedQueryText(value);
  };

  const filteredVideosByText = filterVideosByText(videos, selectedQueryText);

  const genresNames = [
    WithoutGenre,
    ...genres
      .filter((g) => filteredVideosByText.map((v) => v.genre_id).includes(g.id))
      .map((genre) => genre.name),
  ];

  const years = Array.from(new Set(filteredVideos.map((v) => v.release_year)));
  years.sort((a, b) => a - b);

  return (
    <>
      <Header headerText="Video Browser" />
      <div className="flex flex-col justify-center items-center">
        <div className="w-4-6">
          <SearchSection
            years={years}
            setSelectedYear={setSelectedYear}
            genres={genresNames}
            setSelectedGenres={onSelectGenres}
            handleSearchChange={handleSearchChange}
          />
          <div className="text-xl p-5 my-5 text-center border-8 border-sky-500">
            {errorMsg
              ? errorMsg
              : isFetching
              ? "Fetching Data..."
              : `Total Videos: ${filteredVideos.length}`}
          </div>
          {!errorMsg && !isFetching && (
            <VideoResults videos={filteredVideos} genres={genres} />
          )}
        </div>
      </div>
    </>
  );
}
