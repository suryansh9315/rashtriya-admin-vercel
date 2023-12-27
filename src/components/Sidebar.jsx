import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { user_token } from "../atoms/user";
import { IoMdCreate, IoIosList, IoIosLogOut } from "react-icons/io";
import { BiCarousel } from "react-icons/bi";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const Menus = [
    { title: "Create", src: <IoMdCreate className="sm:w-6 w-5 h-5 sm:h-6" color="#fff" />, link: "/" },
    { title: "Search", src: <IoIosList className="sm:w-6 w-5 h-5 sm:h-6" color="#fff" />, link: "/blogs" },
    { title: "Video Carousel", src: <BiCarousel className="sm:w-6 w-5 h-5 sm:h-6" color="#fff" />, link: "/video-carousel" },
    { title: "Logout", src: <IoIosLogOut className="sm:w-6 w-5 h-5 sm:h-6" color="#fff" /> },
  ];
  const [userToken, setUserToken] = useRecoilState(user_token);
  const navigate = useNavigate();

  return (
    <div
      className={` ${
        open ? "w-[100px] sm:w-[100px] md:w-[200px] lg:w-[300px]" : "w-[100px] sm:w-[100px] items-center"
      } bg-[#081A51] h-screen p-5 pt-10 relative duration-300 flex flex-col`}
    >
      <img
        src="control.png"
        className={`absolute cursor-pointer -right-3 top-3 w-7 border-[#081A51] hidden sm:flex
           border-2 rounded-full  ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      />
      <div className="flex gap-x-4 items-center justify-center">
        <img src="logo.jpg" className={`cursor-pointer ${open ? "w-16 sm:w-16" : "w-16 sm:w-16"}`} />
        <h1
          className={`text-white origin-left font-medium text-xl duration-200 ml-2 ${
            open ? "lg:flex hidden" : "hidden"
          }`}
        >
          राष्ट्रीय टीवी
        </h1>
      </div>
      <ul className="pt-6 flex items-center flex-col md:items-start">
        {Menus.map((Menu, index) => (
          <li
            key={index}
            className={`flex  rounded-md p-2 cursor-pointer hover:bg-[rgba(255,255,255,0.17)] text-gray-300 text-sm items-center gap-x-4 mt-2`}
            onClick={() => {
              if (Menu.title === "Logout") {
                setUserToken(null);
                localStorage.setItem("USERTOKEN", null);
                navigate("/login");
              } else {
                navigate(Menu.link);
              }
            }}
          >
            {Menu.src}
            <span className={`${open ? "hidden md:flex" : "hidden"} origin-left duration-200 text-white`}>
              {Menu.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
