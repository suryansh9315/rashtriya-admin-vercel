import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { user_token } from "../atoms/user";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const Menus = [
    { title: "Create", src: "Chart", link: "/" },
    { title: "Search", src: "Search", link: "/blogs" },
    { title: "Logout", src: "Setting" },
  ];
  const [userToken, setUserToken] = useRecoilState(user_token);
  const navigate = useNavigate();

  return (
    <div
      className={` ${
        open ? "w-[20%]" : "w-[8%] items-center"
      } bg-[#081A51] h-screen p-5 pt-10 relative duration-300 flex flex-col`}
    >
      <img
        src="control.png"
        className={`absolute cursor-pointer -right-3 top-3 w-7 border-[#081A51]
           border-2 rounded-full  ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      />
      <div className="flex gap-x-4 items-center">
        <img src="logo.jpg" className={`cursor-pointer duration-500 w-16`} />
        <h1
          className={`text-white origin-left font-medium text-xl duration-200 ml-2 ${
            !open && "scale-0"
          }`}
        >
          राष्ट्रीय टीवी
        </h1>
      </div>
      <ul className="pt-6">
        {Menus.map((Menu, index) => (
          <li
            key={index}
            className={`flex  rounded-md p-2 cursor-pointer hover:bg-[rgba(255,255,255,0.17)] text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} `}
            onClick={() => {
              if (Menu.title === "Logout") {
                setUserToken(null);
                localStorage.setItem("USERTOKEN", null)
                navigate("/login");
              } else {
                navigate(Menu.link)
              }
            }}
          >
            <img src={`${Menu.src}.png`} />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              {Menu.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
