import React, { useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  LinkIcon,
  PhotoIcon,
  VideoCameraIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";
import { AiOutlineClose } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { useRecoilState } from "recoil";
import { user_token } from "../atoms/user";
import ReactPlayer from "react-player/youtube";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

const TextArea = () => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [nationalNews, setNationalNews] = useState(false);
  const [stateNews, setStateNews] = useState(false);
  const [crimeNews, setCrimeNews] = useState(false);
  const [politicsNews, setPoliticsNews] = useState(false);
  const [sportsNews, setSportsNews] = useState(false);
  const [businessNews, setBusinessNews] = useState(false);
  const [employmentNews, setEmploymentNews] = useState(false);
  const [entertainmentNews, setEntertainmentNews] = useState(false);
  const [healthNews, setHealthNews] = useState(false);
  const [spiritualNews, setSpiritualNews] = useState(false);
  const [mediaNews, setMediaNews] = useState(false);
  const [authorNews, setAuthorNews] = useState(false);
  const [viralNews, setViralNews] = useState(false);
  const [podcast, setPodcast] = useState(false);
  const quillRef = useRef(null);
  const quillRef2 = useRef(null);
  const [userToken, setUserToken] = useRecoilState(user_token);
  const [image_1_link_1, setImage_1_link_1] = useState(false);
  const [image_1_link_3, setImage_1_link_3] = useState(false);
  const [image_1_link, setImage_1_link] = useState("");
  const [image_1_yt, setImage_1_yt] = useState("");
  const [image_2_link_1, setImage_2_link_1] = useState(false);
  const [image_2_link_3, setImage_2_link_3] = useState(false);
  const [image_2_link, setImage_2_link] = useState("");
  const [image_2_yt, setImage_2_yt] = useState("");

  const handlePublish = async () => {
    if (!heading) {
      notify("Heading is Mandatory.", "failure");
      return;
    }
    if (!subHeading) {
      notify("Sub-heading is Mandatory.", "failure");
      return;
    }
    if (!value) {
      notify("Cannot upload empty article.", "failure");
      return;
    }
    if (!image) {
      notify("Cover Image is Mandatory.", "failure");
      return;
    }
    const tags = [];
    if (nationalNews) tags.push("national");
    if (stateNews) tags.push("state");
    if (crimeNews) tags.push("crime");
    if (politicsNews) tags.push("politics");
    if (sportsNews) tags.push("sports");
    if (businessNews) tags.push("business");
    if (employmentNews) tags.push("employment");
    if (entertainmentNews) tags.push("entertainment");
    if (healthNews) tags.push("health");
    if (spiritualNews) tags.push("spiritual");
    if (mediaNews) tags.push("media");
    if (authorNews) tags.push("author");
    if (viralNews) tags.push("viral");
    if (podcast) tags.push("podcast");
    try {
      setLoading(true);
      const news_obj = {
        heading,
        subHeading,
        image_section_1: image,
        image_section_2: image2,
        text_section_1: value,
        text_section_2: value2,
        tags,
      };
      const res = await fetch("https://rashtriya-admin-aws.onrender.com/api/blogs/create-blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ blogDetails: news_obj, token: userToken }),
      });
      const data = await res.json();
      if (res.status === 400) notify(data.message, "failure");
      if (res.status === 401) setUserToken(null);
      if (res.status === 200) {
        notify(data.message, "success");
        setHeading("");
        setSubHeading("");
        setValue("");
        setValue2("");
        setImage("");
        setImage2("");
        setNationalNews(false);
        setStateNews(false);
        setCrimeNews(false);
        setPoliticsNews(false);
        setSportsNews(false);
        setBusinessNews(false);
        setEmploymentNews(false);
        setEntertainmentNews(false);
        setHealthNews(false);
        setSpiritualNews(false);
        setMediaNews(false);
        setAuthorNews(false);
        setViralNews(false);
        setPodcast(false);
      }
    } catch (error) {
      console.log(error);
      notify("Something went wrong.", "failure");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e, setImage_Fun) => {
    if (!heading) {
      return notify("Heading is mandatory to use cloud upload.", "failure");
    }
    if (e.target.files.length !== 1) {
      return notify("Choose a single file to upload to the cloud.", "failure");
    }
    try {
      const file = e.target.files[0];
      const storageRef = ref(storage, `blogs/${heading}/image_1`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setImage_Fun({
        type: "image_cloud",
        src: url,
      });
      notify("Image upload was successful.", "success");
    } catch (error) {
      console.log(error);
      notify("Something went wrong.", "failure");
    }
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

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link"],
          [
            {
              color: [
                "#000000",
                "#e60000",
                "#ff9900",
                "#ffff00",
                "#008a00",
                "#0066cc",
                "#9933ff",
                "#ffffff",
                "#facccc",
                "#ffebcc",
                "#ffffcc",
                "#cce8cc",
                "#cce0f5",
                "#ebd6ff",
                "#bbbbbb",
                "#f06666",
                "#ffc266",
                "#ffff66",
                "#66b966",
                "#66a3e0",
                "#c285ff",
                "#888888",
                "#a10000",
                "#b26b00",
                "#b2b200",
                "#006100",
                "#0047b2",
                "#6b24b2",
                "#444444",
                "#5c0000",
                "#663d00",
                "#666600",
                "#003700",
                "#002966",
                "#3d1466",
              ],
            },
          ],
        ],
      },
    }),
    []
  );

  return (
    <div className="flex flex-col gap-5 w-[400px] sm:w-[500px] md:w-[600px] lg:w-[800px]">
      <input
        type="text"
        placeholder="शीर्षक"
        value={heading}
        onChange={(e) => setHeading(e.target.value)}
        className="text-3xl sm:text-4xl bg-[#f4f4f4] focus:outline-none w-full h-10 sm:h-12"
      />
      <input
        type="text"
        placeholder="उपशीर्षक"
        value={subHeading}
        onChange={(e) => setSubHeading(e.target.value)}
        className="text-xl sm:text-2xl bg-[#f4f4f4] focus:outline-none w-full"
      />
      <div className="border relative border-gray-400 border-1 h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] rounded-md shadow-sm flex items-center justify-center gap-4">
        {image && (
          <div
            className="absolute top-0 -right-8 cursor-pointer"
            onClick={() => {
              setImage(null);
              setImage_1_link("");
              setImage_1_yt("");
              setImage_1_link_1(false);
              setImage_1_link_3(false);
            }}
          >
            <AiOutlineClose className="h-6 w-6" />
          </div>
        )}
        {image?.type === "image" && (
          <img
            src={image.src}
            alt="Image does not exist."
            className="h-full w-full"
          />
        )}
        {image?.type === "yt_video" && (
          <ReactPlayer url={image.src} width="800px" height="350px" />
        )}
        {image?.type === "image_cloud" && (
          <img
            src={image.src}
            alt="Image does not exist."
            className="h-full w-full"
          />
        )}
        {!image && (
          <>
            <div>
              <LinkIcon
                onClick={() => setImage_1_link_1(!image_1_link_1)}
                className="h-6 w-6 hover:scale-125 transition-all duration-300 cursor-pointer"
              />
              <div
                className={`shadow-sm absolute mt-2 flex items-center justify-center ${
                  image_1_link_1 ? "block" : "hidden"
                }`}
              >
                <input
                  type="text"
                  onChange={(e) => setImage_1_link(e.target.value)}
                  className="h-10 w-60 relative bg-[#f4f4f4] border border-1 border-gray-500 px-3 py-4 focus:outline-none"
                />
                <div
                  className="bg-blue-500 h-10 w-10 flex items-center justify-center cursor-pointer"
                  onClick={() => {
                    if (image_1_link) {
                      setImage({
                        type: "image",
                        src: image_1_link,
                      });
                    }
                    setImage_1_link_1(false);
                  }}
                >
                  <ArrowRightIcon className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
            <input
              type="file"
              className="hidden"
              id="image_1"
              onChange={(e) => handleImageUpload(e, setImage)}
            />
            <label htmlFor="image_1">
              <PhotoIcon className="h-6 w-6 hover:scale-125 transition-all duration-300 cursor-pointer" />
            </label>
            {/* <div>
              <VideoCameraIcon
                className="h-6 w-6 hover:scale-125 transition-all duration-300 cursor-pointer"
                onClick={() => setImage_1_link_3(!image_1_link_3)}
              />
              <div
                className={`shadow-sm absolute mt-2 flex items-center justify-center ${
                  image_1_link_3 ? "block" : "hidden"
                }`}
              >
                <input
                  type="text"
                  onChange={(e) => setImage_1_yt(e.target.value)}
                  className="h-10 w-60 relative bg-[#f4f4f4] border border-1 border-gray-500 px-3 py-4 focus:outline-none"
                />
                <div
                  className="bg-blue-500 h-10 w-10 flex items-center justify-center cursor-pointer"
                  onClick={() => {
                    if (image_1_yt) {
                      setImage({
                        type: "yt_video",
                        src: image_1_yt,
                      });
                    }
                    setImage_1_link_3(false);
                  }}
                >
                  <ArrowRightIcon className="h-5 w-5 text-white" />
                </div>
              </div>
            </div> */}
          </>
        )}
      </div>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        placeholder="Tell your story..."
        className="text-sm sm:text-base"
        modules={modules}
        ref={quillRef}
      />
      <div className="border relative border-gray-400 border-1 h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] rounded-md shadow-sm flex items-center justify-center gap-4">
        {image2 && (
          <div
            className="absolute top-0 -right-8 cursor-pointer"
            onClick={() => {
              setImage2(null);
              setImage_2_link("");
              setImage_2_yt("");
              setImage_2_link_1(false);
              setImage_2_link_3(false);
            }}
          >
            <AiOutlineClose className="h-6 w-6" />
          </div>
        )}
        {image2?.type === "image" && (
          <img
            src={image2.src}
            alt="Image does not exist."
            className="h-full w-full"
          />
        )}
        {image2?.type === "yt_video" && (
          <ReactPlayer url={image2.src} width="800px" height="350px" />
        )}
        {image2?.type === "image_cloud" && (
          <img
            src={image2.src}
            alt="Image does not exist."
            className="h-full w-full"
          />
        )}
        {!image2 && (
          <>
            <div>
              <LinkIcon
                onClick={() => setImage_2_link_1(!image_2_link_1)}
                className="h-6 w-6 hover:scale-125 transition-all duration-300 cursor-pointer"
              />
              <div
                className={`shadow-sm absolute mt-2 flex items-center justify-center ${
                  image_2_link_1 ? "block" : "hidden"
                }`}
              >
                <input
                  type="text"
                  onChange={(e) => setImage_2_link(e.target.value)}
                  className="h-10 w-60 relative bg-[#f4f4f4] border border-1 border-gray-500 px-3 py-4 focus:outline-none"
                />
                <div
                  className="bg-blue-500 h-10 w-10 flex items-center justify-center cursor-pointer"
                  onClick={() => {
                    if (image_2_link) {
                      setImage2({
                        type: "image",
                        src: image_2_link,
                      });
                    }
                    setImage_2_link_1(false);
                  }}
                >
                  <ArrowRightIcon className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
            <input
              type="file"
              className="hidden"
              id="image_2"
              onChange={(e) => handleImageUpload(e, setImage2)}
            />
            <label htmlFor="image_2">
              <PhotoIcon className="h-6 w-6 hover:scale-125 transition-all duration-300 cursor-pointer" />
            </label>
            <div>
              <VideoCameraIcon
                className="h-6 w-6 hover:scale-125 transition-all duration-300 cursor-pointer"
                onClick={() => setImage_2_link_3(!image_2_link_3)}
              />
              <div
                className={`shadow-sm absolute mt-2 flex items-center justify-center ${
                  image_2_link_3 ? "block" : "hidden"
                }`}
              >
                <input
                  type="text"
                  onChange={(e) => setImage_2_yt(e.target.value)}
                  className="h-10 w-60 relative bg-[#f4f4f4] border border-1 border-gray-500 px-3 py-4 focus:outline-none"
                />
                <div
                  className="bg-blue-500 h-10 w-10 flex items-center justify-center cursor-pointer"
                  onClick={() => {
                    if (image_2_yt) {
                      setImage2({
                        type: "yt_video",
                        src: image_2_yt,
                      });
                    }
                    setImage_2_link_3(false);
                  }}
                >
                  <ArrowRightIcon className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <ReactQuill
        theme="snow"
        value={value2}
        onChange={setValue2}
        placeholder="Tell your story..."
        className=""
        modules={modules}
        ref={quillRef2}
      />
      <div className="flex flex-wrap gap-2 sm:gap-4 my-2 sm:my-5">
        <div
          className={`border-2 px-5 py-2 rounded-md cursor-pointer text-sm hover:bg-green-500 hover:border-green-500 hover:text-white transition-all duration-200 ${
            nationalNews
              ? "border-green-500 bg-green-500 text-white"
              : "border-green-500"
          }`}
          onClick={() => setNationalNews(!nationalNews)}
        >
          राष्ट्रीय समाचार
        </div>
        <div
          className={`border-2 px-5 py-2 rounded-md cursor-pointer text-sm hover:bg-red-500 hover:border-red-500 hover:text-white transition-all duration-200 ${
            stateNews
              ? "border-red-500 bg-red-500 text-white"
              : "border-red-500"
          }`}
          onClick={() => setStateNews(!stateNews)}
        >
          राज्य से खबर
        </div>
        <div
          className={`border-2 px-5 py-2 rounded-md cursor-pointer text-sm hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-all duration-200 ${
            crimeNews
              ? "border-blue-500 bg-blue-500 text-white"
              : "border-blue-500"
          }`}
          onClick={() => setCrimeNews(!crimeNews)}
        >
          अपराध
        </div>
        <div
          className={`border-2 px-5 py-2 rounded-md cursor-pointer text-sm hover:bg-pink-500 hover:border-pink-500 hover:text-white transition-all duration-200 ${
            politicsNews
              ? "border-pink-500 bg-pink-500 text-white"
              : "border-pink-500"
          }`}
          onClick={() => setPoliticsNews(!politicsNews)}
        >
          राजनीति
        </div>
        <div
          className={`border-2 px-5 py-2 rounded-md cursor-pointer text-sm hover:bg-zinc-500 hover:border-zinc-500 hover:text-white transition-all duration-200 ${
            sportsNews
              ? "border-zinc-500 bg-zinc-500 text-white"
              : "border-zinc-500"
          }`}
          onClick={() => setSportsNews(!sportsNews)}
        >
          खेल
        </div>
        <div
          className={`border-2 px-5 py-2 rounded-md cursor-pointer text-sm hover:bg-zinc-500 hover:border-zinc-500 hover:text-white transition-all duration-200 ${
            businessNews
              ? "border-zinc-500 bg-zinc-500 text-white"
              : "border-zinc-500"
          }`}
          onClick={() => setBusinessNews(!businessNews)}
        >
          व्यापार
        </div>
        <div
          className={`border-2 px-5 py-2 rounded-md cursor-pointer text-sm hover:bg-yellow-500 hover:border-yellow-500 hover:text-white transition-all duration-200 ${
            employmentNews
              ? "border-yellow-500 bg-yellow-500 text-white"
              : "border-yellow-500"
          }`}
          onClick={() => setEmploymentNews(!employmentNews)}
        >
          रोजगार
        </div>
        <div
          className={`border-2 px-5 py-2 rounded-md cursor-pointer text-sm hover:bg-teal-500 hover:border-teal-500 hover:text-white transition-all duration-200 ${
            entertainmentNews
              ? "border-teal-500 bg-teal-500 text-white"
              : "border-teal-500"
          }`}
          onClick={() => setEntertainmentNews(!entertainmentNews)}
        >
          मनोरंजन
        </div>
        <div
          className={`border-2 px-5 py-2 rounded-md cursor-pointer text-sm hover:bg-violet-500 hover:border-violet-500 hover:text-white transition-all duration-200 ${
            healthNews
              ? "border-violet-500 bg-violet-500 text-white"
              : "border-violet-500"
          }`}
          onClick={() => setHealthNews(!healthNews)}
        >
          हेल्थ
        </div>
        <div
          className={`border-2 px-5 py-2 rounded-md cursor-pointer text-sm hover:bg-rose-500 hover:border-rose-500 hover:text-white transition-all duration-200 ${
            spiritualNews
              ? "border-rose-500 bg-rose-500 text-white"
              : "border-rose-500"
          }`}
          onClick={() => setSpiritualNews(!spiritualNews)}
        >
          अध्यात्म
        </div>
        <div
          className={`border-2 px-5 py-2 rounded-md cursor-pointer text-sm hover:bg-black hover:border-black hover:text-white transition-all duration-200 ${
            mediaNews ? "border-black bg-black text-white" : "border-black"
          }`}
          onClick={() => setMediaNews(!mediaNews)}
        >
          मीडिया
        </div>
        <div
          className={`border-2 px-5 py-2 rounded-md cursor-pointer text-sm hover:bg-indigo-500 hover:border-indigo-500 hover:text-white transition-all duration-200 ${
            authorNews
              ? "border-indigo-500 bg-indigo-500 text-white"
              : "border-indigo-500"
          }`}
          onClick={() => setAuthorNews(!authorNews)}
        >
          लेखक की कलम से
        </div>
        <div
          className={`border-2 px-5 py-2 rounded-md cursor-pointer text-sm hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all duration-200 ${
            viralNews
              ? "border-orange-500 bg-orange-500 text-white"
              : "border-orange-500"
          }`}
          onClick={() => setViralNews(!viralNews)}
        >
          खबर वायरल है
        </div>
        <div
          className={`border-2 px-5 py-2 rounded-md cursor-pointer text-sm hover:bg-emerald-500 hover:border-emerald-500 hover:text-white transition-all duration-200 ${
            podcast
              ? "border-emerald-500 bg-emerald-500 text-white"
              : "border-emerald-500"
          }`}
          onClick={() => setPodcast(!podcast)}
        >
          पॉडकास्ट
        </div>
      </div>
      <div>
        <div
          onClick={handlePublish}
          className="px-5 py-3 border-2 rounded-md cursor-pointer border-black hover:bg-black hover:border-black hover:text-white transition-all duration-200 text-center mt-0 sm:mt-5"
        >
          Publish
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default TextArea;
