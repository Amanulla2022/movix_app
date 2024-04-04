import React from "react";

import Banner from "./../../components/home_components/Banner";
import ToogleFetch from "../../components/home_components/ToogleFetch";
import Trending from "../../components/home_components/Trending";
import Popular from "../../components/home_components/Popular";
import Hindi from "../../components/home_components/Hindi";

const Home = () => {
  return (
    <div className="mt-14 py-24 bg-navy-blue ">
      <Banner />
      <ToogleFetch />
      <Hindi />
      <Trending />
      <Popular />
    </div>
  );
};

export default Home;
