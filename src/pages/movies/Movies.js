import React, { useEffect, useState } from "react";
import { fetchMovies } from "./../../utils/api";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchInitialMovies = async () => {
      try {
        const queries = ["Batman", "Spiderman", "Superman", "Ironman"];
        const initialMovies = await Promise.all(
          queries.map(async (query) => {
            const movies = await fetchMovies(query);
            return movies;
          })
        );
        const mergedMovies = initialMovies.flat();
        setMovies(mergedMovies);
      } catch (error) {
        console.error("Error fetching initial movies:", error);
      }
    };

    fetchInitialMovies();
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
        {movies && movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.imdbID} className="w-1/4 flex flex-col gap-2 ">
              <img
                className="h-[300px] w-full object-cover bg-navy-blue border-2"
                src={movie.Poster}
                alt={movie.Title}
              />
              <p className="text-white text-lg font-semibold">
                {truncateTitle(movie.Title, 30)}
              </p>
              <p className="text-gray-400 font-semibold">{movie.Year}</p>
            </div>
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
};

export default Movies;
