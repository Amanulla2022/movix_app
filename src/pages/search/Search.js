import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { Link, useParams } from "react-router-dom";

const Search = () => {
  const { query } = useParams();
  const movies = useSelector((state) => state.movies.movies);

  useEffect(() => {}, [query]);

  const truncateTitle = (title, maxLength) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength - 3) + "...";
    } else {
      return title;
    }
  };
  return (
    <div className="bg-navy-blue mt-14 p-4">
      <div className="flex flex-wrap justify-center gap-4">
        {movies && movies.length > 0 ? (
          movies.map((movie) => (
            <Link
              to={`/movies/${movie.imdbID}`}
              key={movie.imdbID}
              className="flex flex-col gap-2"
            >
              <img
                className="h-72 w-72 object-cover"
                src={movie.Poster}
                alt={movie.Title}
              />
              <p className="text-white text-2xl font-semibold">
                {" "}
                {truncateTitle(movie.Title, 20)}
              </p>
              <p className="text-gray-400 font-semibold">{movie.Year}</p>
            </Link>
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
};

export default Search;
