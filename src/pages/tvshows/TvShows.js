import React, { useEffect, useState } from "react";
import { fetchTvShows } from "../../utils/api";
import { Link } from "react-router-dom";

const TvShows = () => {
  const [tvShows, setTvShows] = useState([]);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const fetchInitialTvShows = async () => {
      try {
        const queries = [
          "Taarak Mehta Ka Ooltah Chashmah",
          "Stranger Things",
          "The Mandalorian",
          "Kahaani Ghar Ghar Kii",
          "Khichdi",
          "Game of Thrones",
          "Friends",
          "The Office",
          "The Crown",
        ];
        const initialTvShows = await Promise.all(
          queries.map(async (query) => {
            const tvShows = await fetchTvShows(query);
            return tvShows;
          })
        );
        const mergedTvShows = initialTvShows.flat();
        setTvShows(mergedTvShows);
      } catch (error) {
        console.error("Error fetching initial TV shows:", error);
      }
    };

    fetchInitialTvShows();
  }, []);

  const truncateTitle = (title, maxLength) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength - 3) + "...";
    } else {
      return title;
    }
  };

  const sortTvShows = (sortByValue) => {
    setSortBy(sortByValue);
    let sortedTvshows = [];
    switch (sortByValue) {
      case "titleAsc":
        sortedTvshows = [...tvShows].sort((a, b) =>
          a.Title.localeCompare(b.Title)
        );
        break;
      case "titleDesc":
        sortedTvshows = [...tvShows].sort((a, b) =>
          b.Title.localeCompare(a.Title)
        );
        break;
      case "yearAsc":
        sortedTvshows = [...tvShows].sort(
          (a, b) => parseInt(a.Year) - parseInt(b.Year)
        );
        break;
      case "yearDesc":
        sortedTvshows = [...tvShows].sort(
          (a, b) => parseInt(b.Year) - parseInt(a.Year)
        );
        break;
      default:
        sortedTvshows = tvShows;
    }
    setTvShows(sortedTvshows);
  };

  return (
    <div className="mt-14 bg-navy-blue">
      <div className="flex justify-center items-center gap-4 p-4">
        <h1 className="text-white font-bold text-3xl">Sort The Movies :</h1>
        <select
          className="w-48 h-12 text-white bg-blue-600 rounded-full"
          onChange={(e) => sortTvShows(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="titleAsc">Title A-Z</option>
          <option value="titleDesc">Title Z-A</option>
          <option value="yearAsc">Year Old-New</option>
          <option value="yearDesc">Year New-Old</option>
        </select>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {tvShows && tvShows.length > 0 ? (
          tvShows.map((tvShow) => (
            <Link
              to={`/tvshows/${tvShow.imdbID}`}
              key={tvShow.imdbID}
              className="w-1/3 md:w-1/4 flex flex-col gap-2 "
            >
              {tvShow.Poster ? (
                <img
                  className="h-[300px] w-full  object-cover bg-navy-blue border-2"
                  src={tvShow.Poster}
                  alt={tvShow.Title}
                />
              ) : (
                <div className="h-48 w-full flex justify-center items-center bg-gray-200">
                  <p className="text-gray-500">No Poster Available</p>
                </div>
              )}
              <p className="text-white text-lg font-semibold">
                {truncateTitle(tvShow.Title, 20)}
              </p>
              <p className="text-gray-400 font-semibold">{tvShow.Year}</p>
            </Link>
          ))
        ) : (
          <p>No TV shows found</p>
        )}
      </div>
    </div>
  );
};

export default TvShows;
