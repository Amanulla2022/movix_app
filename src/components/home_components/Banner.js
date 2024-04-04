import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchMovies } from "../../utils/api";
import { setMovies } from "../../slice/moviesSlice";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const data = await fetchMovies(query);
      dispatch(setMovies(data));
      navigate(`/search/${query}`);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <h1 className="text-8xl text-white font-bold">Welcome.</h1>
      <h2 className="text-xl text-center text-white font-semibold">
        Millions of movies, TV shows and people to discover. Explore now.
      </h2>
      <div className="flex items-center justify-center  mt-6 rounded-full md:w-[50%] w-full mx-2">
        <input
          className="w-full h-12 md:w-[calc(100%-150px)]  bg-white outline-none border-0 rounded-l-full px-4 md:px-8 text-base md:text-lg"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie or tv show..."
        />
        <button
          onClick={handleSearch}
          className="w-16 h-12 md:w-20 bg-gradient-to-br from-yellow-400 to-pink-600 text-white font-semibold  rounded-r-full text-lg md:text-xl cursor-pointer focus:outline-none"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Banner;
