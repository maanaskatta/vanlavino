import React, { useState } from "react";
import { AiOutlineLoading3Quarters, AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import Background from "../images/Background.jpg";
import Logo from "../images/Logo.png";

export default function LoginPage({ setCurrentRole }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const handleLogin = () => {
    console.log(userName, password);
    setIsLoading(true);
    if (userName === "admin" && password === "admin") {
      setTimeout(() => {
        setIsLoading(false);
        setCurrentRole("manager");
        localStorage.setItem("role", "manager");
        history.push("/manager");
      }, 2000);
    } else {
      toast.error("Invalid login credentials");
      setUserName("");
      setPassword("");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-black">
        <div
          className="flex justify-center items-center h-screen"
          style={{
            backgroundImage: `url(${Background})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            opacity: 0.5,
            backgroundColor: "black",
          }}
        ></div>
      </div>

      <div
        className="flex w-1/3 flex-col gap-8 rounded-lg p-5"
        style={{
          position: "absolute",
          top: "30%",
          left: "35%",
          backgroundColor: `rgba(0,0,0,0.6)`,
        }}
      >
        <div className="flex justify-center">
          <img src={Logo} alt="" width={150} />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-1">
            <AiOutlineUser className="text-white text-xl" />
            <p className="text-white">Username</p>
          </div>
          <input
            type="text"
            className="w-full px-3 py-2 focus:outline-none"
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Username"
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-1">
            <RiLockPasswordLine className="text-white text-xl" />
            <p className="text-white">Password</p>
          </div>
          <input
            type="password"
            className="w-full px-3 py-2 focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>

        <div className="flex justify-center">
          <button
            className="bg-blue-600 text-lg text-white cursor-pointer px-10 py-2 rounded"
            onClick={() => {
              handleLogin();
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters className=" animate-spin text-xl" />
            ) : (
              "SUBMIT"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
