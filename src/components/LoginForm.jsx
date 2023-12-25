import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRecoilState } from "recoil";
import { user_token } from "../atoms/user";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember_30, setRemember_30] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userToken, setUserToken] = useRecoilState(user_token);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      return notify("Please fill all the required fields.", "failure");
    }
    try {
      setLoading(true);
      const res = await fetch("https://api.rashtriyatv.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.status === 400) notify(data.message, "failure");
      if (res.status === 200) {
        notify(data.message, "success");
        console.log(data.token);
        setUserToken(data.token);
        localStorage.setItem('USERTOKEN', data.token)
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      notify("Something went wrong.", "failure");
    } finally {
      setEmail("");
      setPassword("");
      setLoading(false);
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

  return (
    <div className="flex flex-col justify-center p-8 md:p-14">
      <span className="mb-3 text-4xl font-bold">Login</span>
      <span className="font-light text-gray-400 mb-8">
        Welcom back! Please enter your details
      </span>
      <div className="py-4">
        <span className="mb-2 text-md">Email</span>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <div className="py-4">
        <span className="mb-2 text-md">Password</span>
        <input
          type="password"
          name="pass"
          id="pass"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
        />
      </div>
      <div className="flex justify-between w-full py-4">
        <div className="mr-24">
          <input
            type="checkbox"
            name="ch"
            id="ch"
            className="mr-2"
            onChange={() => setRemember_30(!remember_30)}
          />
          <span className="text-md">Remember for 30 days</span>
        </div>
      </div>
      <button
        onClick={handleLogin}
        className={`w-full bg-black border-black border text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-400 duration-300 ${
          loading ? "pointer-events-none" : ""
        }`}
        disabled={loading}
      >
        Sign in
      </button>
      <Toaster />
    </div>
  );
};

export default LoginForm;
