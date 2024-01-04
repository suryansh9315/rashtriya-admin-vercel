import React, { useEffect, useState } from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import Sidebar from "../components/Sidebar";
import { user_token } from "../atoms/user";
import { useRecoilState } from "recoil";
import toast, { Toaster } from "react-hot-toast";
import SingleBlogList from "../components/SingleBlogList";

const Blogs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [blogsList, setBlogsList] = useState([]);
  const [filteredBlogsList, setFilteredBlogsList] = useState([]);
  const [userToken, setUserToken] = useRecoilState(user_token);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false)

  const handleSearch = () => {
    if (!searchQuery) {
      setFilteredBlogsList(blogsList);
    } else {
      setFilteredBlogsList(
        filteredBlogsList.filter((blog) => blog.heading.includes(searchQuery))
      );
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

  const getBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://api.rashtriyatv.com/api/blogs/getAllBlogs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: userToken }),
        }
      );
      const data = await res.json();
      if (res.status === 400) notify(data.message, "failure");
      if (res.status === 401) setUserToken(null);
      if (res.status === 200) {
        setBlogsList(data.result);
        setFilteredBlogsList(data.result);
      }
    } catch (error) {
      console.log(error);
      notify("Something went wrong.", "failure");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogs();
  }, [reload]);

  return (
    <div className="flex">
      <Sidebar />
      <div className={`py-7 px-3 md:px-7 w-full bg-[#f4f4f4] h-screen overflow-y-scroll`}>
        <h1 className="text-2xl font-semibold mb-5">Blogs</h1>
        <div className="relative shadow mb-5">
          <AiOutlineSearch
            className="absolute top-[14px] left-4 text-xl text-gray-500 cursor-pointer"
            onClick={handleSearch}
          />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for Keywords"
            className="bg-white h-12 px-12 rounded-lg focus:outline-none w-full"
          />
          {searchQuery && (
            <AiOutlineClose
              className="absolute top-[14px] right-4 text-xl text-gray-500 cursor-pointer"
              onClick={() => setSearchQuery("")}
            />
          )}
        </div>
        <div className="rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white border-b-2 border-gray-200">
              <tr>
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left lg:flex hidden">
                  ID
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Heading
                </th>
                <th className="w-20 lg:w-24 p-3 text-sm font-semibold tracking-wide text-left">
                  Status
                </th>
                <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                  Date
                </th>
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Tags
                </th>
                <th className="w-28 p-3 text-sm font-semibold tracking-wide text-left">
                  Update/Delete
                </th>
              </tr>
            </thead>
            <tbody className="divide-y-8 divide-gray-100">
              {filteredBlogsList.map((blog) => (
                <SingleBlogList blog={blog} key={blog._id} reload={reload} setReload={setReload} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Blogs;
