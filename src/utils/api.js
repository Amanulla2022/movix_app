import axios from "axios";

const API_KEY = "c8203424";
const BASE_URL = "http://www.omdbapi.com/";

export const fetchMovies = async (query) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        s: query,
      },
    });
    return response.data.Search;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export const fetchTvShows = async (query) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        s: query,
        type: "series",
      },
    });
    return response.data.Search;
  } catch (error) {
    console.error("Error fetching TV shows:", error);
    return [];
  }
};

export const fetchTrendingMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&s=action&type=movie&y=2022`
    );
    const data = await response.json();
    console.log(data);
    return data.Search;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
};

// Function to fetch trending TV shows
export const fetchTrendingTvShows = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&s=drama&type=series&y=2022`
    );
    const data = await response.json();
    console.log(data);
    return data.Search;
  } catch (error) {
    console.error("Error fetching trending TV shows:", error);
    return [];
  }
};

export const fetchPopularMovies = async () => {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${API_KEY}&s=popular&type=movie`
    );
    const data = await response.json();
    if (data.Response === "True") {
      return data.Search;
    } else {
      console.error("Error fetching popular movies:", data.Error);
      return [];
    }
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
};
export const fetchPopularTvShows = async () => {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${API_KEY}&s=popular&type=series`
    );
    const data = await response.json();
    if (data.Response === "True") {
      return data.Search;
    } else {
      console.error("Error fetching popular TV shows:", data.Error);
      return [];
    }
  } catch (error) {
    console.error("Error fetching popular TV shows:", error);
    return [];
  }
};

export const fetchGetDetails = async (id) => {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch movie details");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching movie details: ${error.message}`);
  }
};
