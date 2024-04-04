import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../slice/moviesSlice";
export const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});

export default store;
