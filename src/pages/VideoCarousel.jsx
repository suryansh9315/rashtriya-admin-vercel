import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Swiper, SwiperSlide } from "swiper/react";
import toast, { Toaster } from "react-hot-toast";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { user_token } from "../atoms/user";
import { useRecoilState } from "recoil";

const VideoCarousel = () => {
  const [userToken, setUserToken] = useRecoilState(user_token);
  const [list, setList] = useState([]);
  const [yt1, setYt1] = useState("");
  const [yt2, setYt2] = useState("");
  const [yt3, setYt3] = useState("");
  const [yt4, setYt4] = useState("");
  const [yt5, setYt5] = useState("");
  const [yt6, setYt6] = useState("");
  const [blog1, setBlog1] = useState("");
  const [blog2, setBlog2] = useState("");
  const [blog3, setBlog3] = useState("");
  const [blog4, setBlog4] = useState("");
  const [blog5, setBlog5] = useState("");
  const [blog6, setBlog6] = useState("");

  const handleUpdate = async () => {
    if (!yt1 || !yt2 || !yt3) {
      notify("Something went wrong.", "failure");
      return;
    }
    const obj = [
      {
        yt: yt1,
        blog: blog1,
      },
      {
        yt: yt2,
        blog: blog2,
      },
      {
        yt: yt3,
        blog: blog3,
      },
    ];
    if (yt4) {
      obj.push({ yt: yt4, blog: blog4 });
    }
    if (yt5) {
      obj.push({ yt: yt5, blog: blog5 });
    }
    if (yt6) {
      obj.push({ yt: yt6, blog: blog6 });
    }
    setList(obj);
    try {
      const res = await fetch(
        "https://rashtriya-admin-aws.onrender.com/api/blogs/updateYtList",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: userToken, list }),
        }
      );
      const data = await res.json();
      if (res.status === 400) notify(data.message, "failure");
      if (res.status === 401) setUserToken(null);
      if (res.status === 200) {
        notify("Updated.", "success");
      }
    } catch (error) {
      console.log(error);
      notify("Something went wrong.", "failure");
    }
  };

  const handlePreview = () => {
    if (!yt1 || !yt2 || !yt3) {
      notify("Something went wrong.", "failure");
      return;
    }
    const obj = [
      {
        yt: yt1,
        blog: blog1,
      },
      {
        yt: yt2,
        blog: blog2,
      },
      {
        yt: yt3,
        blog: blog3,
      },
    ];
    if (yt4) {
      obj.push({ yt: yt4, blog: blog4 });
    }
    if (yt5) {
      obj.push({ yt: yt5, blog: blog5 });
    }
    if (yt6) {
      obj.push({ yt: yt6, blog: blog6 });
    }
    setList(obj);
  };

  const notify = (text, status) => {
    if (status === "failure")
      toast(text, {
        icon: "❌",
      });
    if (status === "success")
      toast(text, {
        icon: "✅",
      });
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="bg-[#fff] w-full py-7 px-3 sm:px-7 h-screen overflow-y-scroll overflow-x-scroll">
        <div className="w-[450px] sm:w-[600px] md:w-[800px] flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Video Carousel</h1>
          <div className="flex gap-4">
            <button
              onClick={handlePreview}
              className="outline-none px-8 py-[10px] bg-blue-600 rounded-md text-white text-sm hover:bg-blue-400 transition-all duration-200"
            >
              Preview
            </button>
            <button
              onClick={handleUpdate}
              className="outline-none px-8 py-[10px] bg-blue-600 rounded-md text-white text-sm hover:bg-blue-400 transition-all duration-200"
            >
              Update
            </button>
          </div>
        </div>
        {list.length != 0 ? (
          <>
            <div className="w-[450px] h-[253px] sm:w-[600px] sm:h-[338px] md:w-[800px] md:h-[450px]">
              <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                delay={30}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation, Autoplay]}
              >
                {list?.map((video) => (
                  <SwiperSlide key={video?.yt}>
                    <iframe
                      className="rounded-lg "
                      width="800"
                      height="450"
                      src={video?.yt}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </>
        ) : (
          <>
            <div className=" w-[450px] h-[253px] sm:w-[600px] sm:h-[338px] md:w-[800px] md:h-[450px] flex items-center justify-center rounded-lg bg-[#f4f4f4] shadow">
              <div className="text-lg font-light">Add links to see preview</div>
            </div>
          </>
        )}
        <div className="w-[450px] sm:w-[600px] md:w-[800px] mt-10 flex flex-col gap-6">
          <div className="bg-[#f4f4f4] px-6 py-6 flex flex-col items-center justify-center rounded-md shadow-sm w-full gap-5">
            <div className="w-full">
              <div className="font-normal text-sm mb-2 ml-1">YOUTUBE LINK</div>
              <input
                className="bg-[#fff] px-5 py-3 sm:py-4 w-[100%] rounded-md shadow-sm outline-none"
                type="text"
                placeholder="Paste yt link here"
                value={yt1}
                onChange={(e) => setYt1(e.target.value)}
              />
            </div>
            <div className="w-full">
              <div className="font-normal text-sm mb-2 ml-1">BLOG LINK</div>
              <input
                className="bg-[#fff] px-5 py-3 sm:py-4 w-[100%] rounded-md shadow-sm outline-none"
                type="text"
                placeholder="Paste blog link here"
                value={blog1}
                onChange={(e) => setBlog1(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-[#f4f4f4] px-6 py-6 flex flex-col items-center justify-center rounded-md shadow-sm w-full gap-5">
            <div className="w-full">
              <div className="font-normal text-sm mb-2 ml-1">YOUTUBE LINK</div>
              <input
                className="bg-[#fff] px-5 py-3 sm:py-4 w-[100%] rounded-md shadow-sm outline-none"
                type="text"
                placeholder="Paste yt link here"
                value={yt2}
                onChange={(e) => setYt2(e.target.value)}
              />
            </div>
            <div className="w-full">
              <div className="font-normal text-sm mb-2 ml-1">BLOG LINK</div>
              <input
                className="bg-[#fff] px-5 py-3 sm:py-4 w-[100%] rounded-md shadow-sm outline-none"
                type="text"
                placeholder="Paste blog link here"
                value={blog2}
                onChange={(e) => setBlog2(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-[#f4f4f4] px-6 py-6 flex flex-col items-center justify-center rounded-md shadow-sm w-full gap-5">
            <div className="w-full">
              <div className="font-normal text-sm mb-2 ml-1">YOUTUBE LINK</div>
              <input
                className="bg-[#fff] px-5 py-3 sm:py-4 w-[100%] rounded-md shadow-sm outline-none"
                type="text"
                placeholder="Paste yt link here"
                value={yt3}
                onChange={(e) => setYt3(e.target.value)}
              />
            </div>
            <div className="w-full">
              <div className="font-normal text-sm mb-2 ml-1">BLOG LINK</div>
              <input
                className="bg-[#fff] px-5 py-3 sm:py-4 w-[100%] rounded-md shadow-sm outline-none"
                type="text"
                placeholder="Paste blog link here"
                value={blog3}
                onChange={(e) => setBlog3(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-[#f4f4f4] px-6 py-6 flex flex-col items-center justify-center rounded-md shadow-sm w-full gap-5">
            <div className="w-full">
              <div className="font-normal text-sm mb-2 ml-1">YOUTUBE LINK</div>
              <input
                className="bg-[#fff] px-5 py-3 sm:py-4 w-[100%] rounded-md shadow-sm outline-none"
                type="text"
                placeholder="Paste yt link here"
                value={yt4}
                onChange={(e) => setYt4(e.target.value)}
              />
            </div>
            <div className="w-full">
              <div className="font-normal text-sm mb-2 ml-1">BLOG LINK</div>
              <input
                className="bg-[#fff] px-5 py-3 sm:py-4 w-[100%] rounded-md shadow-sm outline-none"
                type="text"
                placeholder="Paste blog link here"
                value={blog4}
                onChange={(e) => setBlog4(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-[#f4f4f4] px-6 py-6 flex flex-col items-center justify-center rounded-md shadow-sm w-full gap-5">
            <div className="w-full">
              <div className="font-normal text-sm mb-2 ml-1">YOUTUBE LINK</div>
              <input
                className="bg-[#fff] px-5 py-3 sm:py-4 w-[100%] rounded-md shadow-sm outline-none"
                type="text"
                placeholder="Paste yt link here"
                value={yt5}
                onChange={(e) => setYt5(e.target.value)}
              />
            </div>
            <div className="w-full">
              <div className="font-normal text-sm mb-2 ml-1">BLOG LINK</div>
              <input
                className="bg-[#fff] px-5 py-3 sm:py-4 w-[100%] rounded-md shadow-sm outline-none"
                type="text"
                placeholder="Paste blog link here"
                value={blog5}
                onChange={(e) => setBlog5(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-[#f4f4f4] px-6 py-6 flex flex-col items-center justify-center rounded-md shadow-sm w-full gap-5">
            <div className="w-full">
              <div className="font-normal text-sm mb-2 ml-1">YOUTUBE LINK</div>
              <input
                className="bg-[#fff] px-5 py-3 sm:py-4 w-[100%] rounded-md shadow-sm outline-none"
                type="text"
                placeholder="Paste yt link here"
                value={yt6}
                onChange={(e) => setYt6(e.target.value)}
              />
            </div>
            <div className="w-full">
              <div className="font-normal text-sm mb-2 ml-1">BLOG LINK</div>
              <input
                className="bg-[#fff] px-5 py-3 sm:py-4 w-[100%] rounded-md shadow-sm outline-none"
                type="text"
                placeholder="Paste blog link here"
                value={blog6}
                onChange={(e) => setBlog6(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default VideoCarousel;
