import React, { useEffect, useState } from "react";
import { fetchMovies, fetchTvShows } from "../../utils/api";
import ContextWrapper from "../../ContextWrapper";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import SwitchTabs from "../SwithTabs";
import { Link } from "react-router-dom";

const Hindi = () => {
  const [content, setContent] = useState("movies");
  const [data, setData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(3);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        let initialData = [];
        if (content === "movies") {
          const hindiMovies = await fetchMovies("Indian");
          initialData = hindiMovies;
        } else if (content === "tvShows") {
          const hindiTvShows = await fetchTvShows("Indian");
          initialData = hindiTvShows;
        }
        shuffleArray(initialData);
        console.log(initialData);
        setData(initialData);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };
    fetchInitialData();
  }, [content]);

  const handleNext = () => {
    if (endIndex < data.length - 1) {
      setStartIndex(startIndex + 1);
      setEndIndex(Math.min(endIndex + 1, data.length - 1));
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(Math.max(startIndex - 1, 0));
      setEndIndex(endIndex - 1);
    }
  };

  const truncateTitle = (title, maxLength) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength - 3) + "...";
    } else {
      return title;
    }
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };
  return (
    <ContextWrapper>
      <div className="bg-navy-blue m-12 p-4">
        <div className="flex justify-around items-center">
          <h1 className="text-white text-2xl">Indian</h1>
          <SwitchTabs
            data={["Movies", "TV Shows"]}
            onTabChange={(tab) => {
              setContent(tab === "Movies" ? "movies" : "tvShows");
            }}
          />
        </div>

        <div className="flex items-center justify-center mt-6">
          <RiArrowLeftSLine
            onClick={handlePrev}
            className={`text-4xl mr-4 ${
              startIndex === 0
                ? "text-gray-400"
                : "text-gray-700 cursor-pointer"
            }`}
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data && data.length > 0 ? (
              data.slice(startIndex, endIndex + 1).map((item) => (
                <Link
                  key={item.imdbID}
                  to={`/${content}/${item.imdbID}`}
                  className="flex flex-col item-start"
                >
                  <img
                    className="w-48 h-72 object-cover rounded"
                    src={item.Poster}
                    alt={item.Title}
                  />
                  <p className="text-white font-semibold text-lg mt-2">
                    {truncateTitle(item.Title, 20)}
                  </p>
                  <p className="text-gray-400">{item.Year}</p>
                </Link>
              ))
            ) : (
              <p className="text-white">No data found</p>
            )}
          </div>
          <RiArrowRightSLine
            onClick={handleNext}
            className={`text-4xl ml-4 ${
              endIndex === data.length - 1
                ? "text-gray-400"
                : "text-gray-700 cursor-pointer"
            }`}
          />
        </div>
      </div>
    </ContextWrapper>
  );
};

export default Hindi;
