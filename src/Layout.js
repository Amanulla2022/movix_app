import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header_Footer/Header";
import Footer from "./components/Header_Footer/Footer";
import Home from "./pages/home/Home";
import PageNoteFound from "./pages/pageNotFound/PageNoteFound";
import Movies from "./pages/movies/Movies";
import TvShows from "./pages/tvshows/TvShows";
// import MovieDetails from "./pages/home/MovieDetails";
import Search from "./pages/search/Search";

const Layout = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/search/:query" element={<Search />} />
        <Route path="/tvshows" element={<TvShows />} />
        <Route path="*" element={<PageNoteFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Layout;
