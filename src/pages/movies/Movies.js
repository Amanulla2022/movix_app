import React, { useEffect, useState } from "react";
import { fetchMovies } from "./../../utils/api";
import { Link } from "react-router-dom";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const fetchInitialMovies = async () => {
      try {
        const queries = [
          "Batman",
          "Bahubali",
          "Sholay",
          "Spiderman",
          "Superman",
          "Dil",
        ];
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

  const sortMovies = (sortByValue) => {
    setSortBy(sortByValue);
    let sortedMovies = [];
    switch (sortByValue) {
      case "titleAsc":
        sortedMovies = [...movies].sort((a, b) =>
          a.Title.localeCompare(b.Title)
        );
        break;
      case "titleDesc":
        sortedMovies = [...movies].sort((a, b) =>
          b.Title.localeCompare(a.Title)
        );
        break;
      case "yearAsc":
        sortedMovies = [...movies].sort(
          (a, b) => parseInt(a.Year) - parseInt(b.Year)
        );
        break;
      case "yearDesc":
        sortedMovies = [...movies].sort(
          (a, b) => parseInt(b.Year) - parseInt(a.Year)
        );
        break;
      default:
        sortedMovies = movies;
    }
    setMovies(sortedMovies);
  };
  return (
    <div className="mt-14 bg-navy-blue">
      <div className="flex justify-center items-center gap-4 p-4">
        <h1 className="text-white font-bold text-3xl">Sort The Movies :</h1>
        <select
          className="w-48 h-12 text-white bg-blue-600 rounded-full"
          onChange={(e) => sortMovies(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="titleAsc">Title A-Z</option>
          <option value="titleDesc">Title Z-A</option>
          <option value="yearAsc">Year Old-New</option>
          <option value="yearDesc">Year New-Old</option>
        </select>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {movies && movies.length > 0 ? (
          movies.map((movie) => (
            <Link
              to={`/movies/${movie.imdbID}`}
              key={movie.imdbID}
              className="w-1/3 md:w-1/4 flex flex-col gap-2 "
            >
              <img
                className="h-[300px] w-full object-cover bg-navy-blue border-2"
                src={movie.Poster}
                alt={movie.Title}
              />
              <p className="text-white text-lg font-semibold">
                {truncateTitle(movie.Title, 30)}
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

export default Movies;
