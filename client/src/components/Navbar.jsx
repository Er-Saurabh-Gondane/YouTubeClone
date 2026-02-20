import React from "react";
import Avatar from 'react-avatar'
import { AiOutlineMenu } from "react-icons/ai";
import logo from "../assets/logo.svg";
import { CiSearch } from "react-icons/ci";
import { IoMicOutline } from "react-icons/io5";
import { RiVideoAddLine } from "react-icons/ri";
import { FaRegBell } from "react-icons/fa";
import profile from "../assets/gerard.png";

function Navbar() {
  return (
    <div className="flex justify-between items-center px-6 py-2">
      <div className="flex items-center gap-4">
        <AiOutlineMenu className="text-2xl cursor-pointer font-bold" />
        <img src={logo} alt="" className="cursor-pointer w-28" />
      </div>
      <div className="flex w-[35%]  items-center">
        <div className="w-full border-[0.5px] border-l border-y border-gray-400 rounded-l-full px-10 cursor-pointer   py-2">
          <input
            type="text"
            placeholder="search.."
            className="outline-none w-full"
          />
        </div>
        <button className="cursor-pointer font-bold bg-gray-300 text-xl border-[0.5px] border-gray-400 border-t  border-b border-r px-4 py-2.5 rounded-r-full">
          <CiSearch />
        </button>
        <div className="text-2xl ml-3 cursor-pointer  p-2 rounded-full hover:bg-gray-200 duration-200">
          <IoMicOutline />
        </div>
      </div>
      <div className="flex items-center ">
        <div className="flex text-2xl gap-2.5 mr-10">
          <RiVideoAddLine />
          <FaRegBell />
        </div>

        <Avatar src={profile} size="32" round={true}/>
      </div>
    </div>
  );
}

export default Navbar;
