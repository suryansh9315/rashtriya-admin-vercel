import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { user_token } from "./atoms/user";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const App = () => {
  const [userToken, setUserToken] = useRecoilState(user_token);
  const navigate = useNavigate();

  useEffect(() => {
    const old_userToken = localStorage.getItem("USERTOKEN");
    const func = async () => {
      const res = await fetch("http://rashtriya-tv-nodejs-env.eba-4gfrfqri.us-east-1.elasticbeanstalk.com/api/auth/check-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: old_userToken }),
      });
      const data = await res.json();
      if (res.status === 200) {
        setUserToken(old_userToken);
      } else {
        setUserToken(null);
        navigate("/login");
      }
    };
    if (old_userToken) {
      func();
    } else {
      setUserToken(null);
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Routes>
        {userToken ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="*" element={<NotFound />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
