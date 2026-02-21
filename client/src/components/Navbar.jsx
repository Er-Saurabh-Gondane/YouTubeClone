import React from "react";
import Avatar from "react-avatar";
import { AiOutlineMenu } from "react-icons/ai";
import youtube from "../assets/youtube.svg";
import { CiSearch } from "react-icons/ci";
import { IoMicOutline } from "react-icons/io5";
import { RiVideoAddLine } from "react-icons/ri";
import { FaRegBell } from "react-icons/fa";
import profile from "../assets/saurabh.png";
import { Link } from "react-router-dom";

function Navbar({ toggleSidebar }) {
  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between gap-2 px-3 py-2 sm:px-4 md:px-6">
        {/* Left: menu + logo */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={toggleSidebar}
            className="flex items-center justify-center rounded-full p-2 text-2xl hover:bg-gray-200 transition-colors duration-200"
          >
            <AiOutlineMenu />
          </button>

          <Link to="/" className="flex items-center">
            <img
              src={youtube}
              alt="YouTube"
              className="cursor-pointer w-20 sm:w-24 md:w-28"
            />
          </Link>
        </div>

        {/* Middle: search */}
        <div className="flex flex-1 items-center justify-center mx-2">
          {/* Desktop / tablet search bar */}
          <div className="hidden md:flex w-full max-w-xl items-center">
            <div className="flex w-full items-center border border-gray-400 rounded-l-full px-4 py-2 bg-white">
              <input
                type="text"
                placeholder="Search"
                className="w-full outline-none text-sm"
              />
            </div>
            <button className="flex items-center justify-center border border-gray-400 border-l-0 bg-gray-100 px-4 py-2.5 rounded-r-full text-xl hover:bg-gray-200 transition-colors duration-200">
              <CiSearch />
            </button>
            <button className="ml-3 flex items-center justify-center rounded-full p-2 text-2xl hover:bg-gray-200 transition-colors duration-200">
              <IoMicOutline />
            </button>
          </div>

          {/* Mobile search icon only */}
          <button className="flex md:hidden items-center justify-center rounded-full p-2 text-2xl hover:bg-gray-200 transition-colors duration-200">
            <CiSearch />
          </button>
        </div>

        {/* Right: icons + avatar */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Hide icons on very small screens, show from sm+ */}
          <div className="hidden sm:flex items-center text-xl sm:text-2xl gap-3 sm:gap-4 mr-1 sm:mr-2">
            <button className="hover:bg-gray-200 rounded-full p-2 transition-colors duration-200">
              <RiVideoAddLine />
            </button>
            <button className="hover:bg-gray-200 rounded-full p-2 transition-colors duration-200">
              <FaRegBell />
            </button>
          </div>

          <Avatar src={profile} size="32" round={true} />
        </div>
      </div>
    </header>
  );
}

export default Navbar;