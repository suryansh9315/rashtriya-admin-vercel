import React, { useEffect, useState } from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import Sidebar from "../components/Sidebar";
import { user_token } from "../atoms/user";
import { useRecoilState } from "recoil";
import toast, { Toaster } from "react-hot-toast";

const Blogs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [blogsList, setBlogsList] = useState([]);
  const [filteredBlogsList, setFilteredBlogsList] = useState([]);
  const [userToken, setUserToken] = useRecoilState(user_token);
  const [loading, setLoading] = useState(false);

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

  const handleStatus = async (blog) => {
    try {
      setLoading(true);
      const res = await fetch(
        "http://rashtriya-tv-nodejs-env.eba-4gfrfqri.us-east-1.elasticbeanstalk.com/api/blogs/changeBlogStatus",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: userToken, blogId: blog._id }),
        }
      );
      const data = await res.json();
      if (res.status === 400) notify(data.message, "failure");
      if (res.status === 401) setUserToken(null);
      if (res.status === 200) {
        notify(data.message, "success");
        getBlogs();
      }
    } catch (error) {
      console.log(error);
      notify("Something went wrong.", "failure");
    } finally {
      setLoading(false);
    }
  };

  const getBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "http://rashtriya-tv-nodejs-env.eba-4gfrfqri.us-east-1.elasticbeanstalk.com/api/blogs/getAllBlogs",
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
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className={`py-7 px-7 w-full bg-[#f3f4f6]`}>
        <h1 className="text-2xl font-semibold mb-5">Blogs</h1>
        <div className="relative shadow-md mb-5">
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
        <div className="overflow-auto rounded-lg shadow">
          <table className="w-full">
            <thead className="bg-white border-b-2 border-gray-200">
              <tr>
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                  ID
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Heading
                </th>
                <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                  Status
                </th>
                <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                  Date
                </th>
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Tags
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredBlogsList.map((blog) => (
                <tr className="bg-white" key={blog._id}>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    <a
                      href="#"
                      className="font-bold text-blue-500 hover:underline"
                    >
                      {blog._id.substring(0, 10)}...
                    </a>
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {blog.heading.substring(0, 40)}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    <span
                      className={`p-1.5 text-xs font-medium uppercase tracking-wider cursor-pointer ${
                        blog.status ? "text-green-800" : "text-gray-800"
                      } ${
                        blog.status ? "bg-green-200" : "bg-gray-200"
                      } rounded-lg bg-opacity-50`}
                      onClick={() => handleStatus(blog)}
                    >
                      {blog.status ? "Published" : "Not Published"}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {new Date(blog.createdAt)
                      .toString()
                      .split(" ")
                      .slice(0, 4)
                      .join(" ")}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {blog.tags.join(", ")}
                  </td>
                </tr>
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
