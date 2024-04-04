import React, { useEffect, useState } from "react";
import { fetchTvShows } from "../../utils/api";

const TvShows = () => {
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    const fetchInitialTvShows = async () => {
      try {
        const queries = [
          "Breaking Bad",
          "Game of Thrones",
          "Stranger Things",
          "The Mandalorian",
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

  return (
    <div className="mt-14 bg-navy-blue">
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {tvShows && tvShows.length > 0 ? (
          tvShows.map((tvShow) => (
            <div key={tvShow.imdbID} className="w-1/4 flex flex-col gap-2 ">
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
            </div>
          ))
        ) : (
          <p>No TV shows found</p>
        )}
      </div>
    </div>
  );
};

export default TvShows;
