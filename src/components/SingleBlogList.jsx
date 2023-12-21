import React, { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { IoPush } from "react-icons/io5";
import toast from "react-hot-toast";
import { user_token } from "../atoms/user";
import { useRecoilState } from "recoil";

const tagsList = [
  "national",
  "state",
  "crime",
  "politics",
  "sports",
  "business",
  "employment",
  "entertainment",
  "health",
  "spiritual",
  "media",
  "author",
  "viral",
  "podcast",
];

const SingleBlogList = ({ blog }) => {
  const [tags, setTags] = useState(blog?.tags);
  const [status, setStatus] = useState(blog?.status);
  const [loading, setLoading] = useState(false);
  const [userToken, setUserToken] = useRecoilState(user_token);

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

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "http://rashtriya-tv-nodejs-env.eba-4gfrfqri.us-east-1.elasticbeanstalk.com/api/blogs/updateBlog",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: userToken,
            blogId: blog._id,
            status,
            tags,
          }),
        }
      );
      const data = await res.json();
      if (res.status === 400) notify(data.message, "failure");
      if (res.status === 401) setUserToken(null);
      if (res.status === 200) {
        notify(data.message, "success");
      }
    } catch (error) {
      console.log(error);
      notify("Something went wrong.", "failure");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTags(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <tr className="bg-white w-full" key={blog._id}>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        <a href="#" className="font-bold text-blue-500 hover:underline">
          {blog._id.substring(0, 10)}...
        </a>
      </td>
      <td className="p-3 text-base text-gray-700 whitespace-nowrap">
        {blog.heading.substring(0, 40)}
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        <span
          className={`p-1.5 text-xs font-medium uppercase tracking-wider cursor-pointer ${
            status ? "text-green-800" : "text-gray-800"
          } ${
            status ? "bg-green-200" : "bg-gray-200"
          } rounded-lg bg-opacity-50`}
          onClick={() => setStatus(!status)}
        >
          {status ? "Published" : "Not Published"}
        </span>
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        {new Date(blog.createdAt).toString().split(" ").slice(0, 4).join(" ")}
      </td>
      <td className="p-1 text-sm text-gray-700 whitespace-nowrap">
        <FormControl sx={{ m: 1, width: 200 }}>
          <InputLabel id="demo-simple-select-label">Tags</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            multiple
            value={tags}
            onChange={handleChange}
            input={<OutlinedInput label="Tags" />}
            className="h-14"
          >
            {tagsList.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </td>
      <td className="p-3 flex items-center justify-end h-20 w-16">
        <IoPush
          size={28}
          className="text-blue-500 hover:text-blue-300 transition-all duration-200 cursor-pointer"
          onClick={handleUpdate}
        />
      </td>
    </tr>
  );
};

export default SingleBlogList;
