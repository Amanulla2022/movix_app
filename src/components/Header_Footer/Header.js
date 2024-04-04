import React, { useState } from "react";
import logo from "../../images/movix-logo.svg";
import { FaSearch } from "react-icons/fa";
import { IoMdList, IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import ContextWrapper from "../../ContextWrapper";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const openSearch = () => {
    setMobileMenu(false);
    setIsSearchOpen(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setIsSearchOpen(false);
  };

  return (
    <ContextWrapper>
      <header
        className={`text-white bg-black fixed top-0 left-0 w-full flex items-center md:justify-around justify-between transition-all duration-500 p-2
       ${isMenuOpen ? "-translate-y-full" : ""}`}
      >
        <Link to="/">
          <img src={logo} alt="Logo" className="h-10" />
        </Link>

        <div className="flex items-center justify-end md:pr-4">
          <ul
            className={`hidden md:flex items-center gap-4 ${
              mobileMenu ? "hidden" : ""
            }`}
          >
            <li className="mr-4 hover:text-pink-600 cursor-pointer">
              {" "}
              <Link to="/movies">Movies</Link>
            </li>
            <li className="mr-4 hover:text-pink-600 cursor-pointer">
              <Link to="/tvshows">TV Shows</Link>
            </li>
            <li>
              <FaSearch
                onClick={openSearch}
                className="cursor-pointer hover:text-pink-600"
              />
            </li>
          </ul>

          <div className="mobileMenuItems flex items-center gap-4 md:hidden">
            <FaSearch onClick={openSearch} />
            {mobileMenu ? (
              <IoMdClose
                onClick={() => setMobileMenu(false)}
                className="text-lg cursor-pointer"
              />
            ) : (
              <IoMdList
                onClick={openMobileMenu}
                className="cursor-pointer text-lg "
              />
            )}
          </div>
        </div>

        {isSearchOpen && (
          <div className=" w-full h-12 absolute top-16 ">
            <div className="flex justify-evenly  items-center">
              <input
                type="text"
                placeholder="Search for a movie or TV show..."
                className="w-4/5 h-12 px-4 "
              />
              <IoMdClose
                onClick={() => setIsSearchOpen(false)}
                className="text-lg cursor-pointer text-black"
              />
            </div>
          </div>
        )}

        {mobileMenu && (
          <div className="md:hidden w-full absolute bg-black top-12 border -ml-2 flex flex-col items-start border-t-2 border-pink-500 text-white p-2">
            <ul className="flex flex-col gap-4">
              <li className="hover:text-pink-600 cursor-pointer">
                <Link to="/movies">Movies</Link>
              </li>
              <li className="hover:text-pink-600 cursor-pointer">
                <Link to="/tvshows">TV Shows</Link>
              </li>
            </ul>
          </div>
        )}
      </header>
    </ContextWrapper>
  );
};

export default Header;
