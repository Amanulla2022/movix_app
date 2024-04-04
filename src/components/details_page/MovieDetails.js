import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchGetDetails } from "../../utils/api";
import { TiStar } from "react-icons/ti";
import { MdCelebration } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await fetchGetDetails(id);
        console.log(details);
        setMovieDetails(details);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchDetails();
  }, [id]);

  if (!movieDetails) {
    return <p className="mt-20">Loading...</p>;
  }

  return (
    <div className="mt-14 py-8 bg-navy-blue">
      <div className="flex justify-center items-center gap-4 p-4">
        <h1 className="underline text-purple-800 font-bold text-4xl">
          {movieDetails.Title}
        </h1>
      </div>
      <div className="flex flex-col-reverse  lg:flex-row mt-6 p-2">
        <img
          className="w-full lg:w-1/3 object-contain bg-navy-blue border-2"
          src={movieDetails.Poster}
          alt={movieDetails.Title}
        />
        <div className="lg:ml-8 w-full">
          <p className="text-white text-2xl font-semibold underline">Details</p>
          <div className="flex flex-col gap-4">
            <div className="flex gap-8 mt-4">
              <p className="text-green-500 font-semibold text-xl">
                {movieDetails.BoxOffice}
              </p>

              <p className="text-white text-lg font-semibold flex">
                Rating : {movieDetails.imdbRating}
                <TiStar className="text-yellow-500 text-3xl" />
              </p>
            </div>
            <p className="flex justify-start gap-4 items-center text-gray-400">
              {movieDetails.Year} |{" "}
              <span className="bg-slate-400 text-white hover:bg-slate-700 rounded-2xl p-2">
                {movieDetails.Runtime}
              </span>{" "}
              |{" "}
              <span className="flex items-center align-middle">
                {movieDetails.Released}
                <MdCelebration className="text-2xl text-yellow-500" />
              </span>
            </p>
            <p className="  text-gray-500 bg-purple-400 rounded-full  w-44 p-2">
              {movieDetails.Genre}
            </p>
            <p className="text-xl font-medium text-teal-600">
              {movieDetails.Language}
            </p>
            <p className="text-xl font-medium text-blue-600">
              {movieDetails.Country}
            </p>
            <p className="text-lg text-white">
              <span className="underline">Hint :</span> {movieDetails.Plot}
            </p>
            <p className="text-lg text-white">
              <span className="underline">Actors : </span> {movieDetails.Actors}
            </p>
            <p className="text-lg text-white">
              <span className="underline">Writer : </span> {movieDetails.Writer}
            </p>
            <p className="text-lg text-white">
              <span className="underline">Director : </span>{" "}
              {movieDetails.Director}
            </p>
            <Link
              to="/movies"
              className="flex justify-center gap-8 items-center bg-black rounded-full text-white w-42 p-2"
            >
              <IoMdArrowRoundBack />
              Go To Movies Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieDetails;
