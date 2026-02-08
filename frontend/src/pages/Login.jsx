import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContent);

  const [state, setState] = useState("Sign Up");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      // Enable sending cookies with requests
      axios.defaults.withCredentials = true;
      if (state === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          password,
        });
        console.log(response);
        if (response.data.success) {
          setIsLoggedIn(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        });

        if (response.data.success) {
          setIsLoggedIn(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "An unexpected error occurred.",
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-0 py-8 sm:py-0 bg-linear-to-br from-blue-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=""
        className="absolute left-4 sm:left-20 top-4 sm:top-5 w-24 sm:w-32 cursor-pointer"
      />
      <div className="bg-slate-900 p-6 sm:p-10 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md text-indigo-300 text-[13px] sm:text-sm">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white text-center mb-3">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p className="text-center text-xs sm:text-sm mb-6">
          {state === "Sign Up"
            ? "Create your account"
            : "Login to your account!."}
        </p>
        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div className="mb-4 flex items-center gap-2 sm:gap-3 w-full px-4 sm:px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img
                src={assets.person_icon}
                alt=""
                className="w-4 h-4 sm:w-5 sm:h-5"
              />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="bg-transparent outline-none text-white flex-1 min-w-0 text-sm sm:text-base placeholder:text-slate-400"
                type="text"
                placeholder="Full Name"
                required
              />
            </div>
          )}

          <div className="mb-4 flex items-center gap-2 sm:gap-3 w-full px-4 sm:px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img
              src={assets.mail_icon}
              alt=""
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="bg-transparent outline-none text-white flex-1 min-w-0 text-sm sm:text-base placeholder:text-slate-400"
              type="email"
              placeholder="Email Address"
              required
            />
          </div>
          <div className="mb-4 flex items-center gap-2 sm:gap-3 w-full px-4 sm:px-5 py-2.5 rounded-full bg-[#333A5C] relative">
            <img
              src={assets.lock_icon}
              alt=""
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="bg-transparent outline-none text-white flex-1 min-w-0 text-sm sm:text-base placeholder:text-slate-400"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
            />
            <span
              className="absolute right-4 sm:right-5 cursor-pointer text-base sm:text-lg"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
          <p
            onClick={() => navigate("/reset-password")}
            className="mb-4 text-indigo-500 cursor-pointer text-xs sm:text-sm"
          >
            Forgot password?
          </p>

          <button className="w-full py-2.5 rounded-full bg-linear-to-r from-indigo-500 to-indigo-900 text-white font-medium text-sm sm:text-base hover:from-indigo-600 hover:to-indigo-800 transition duration-300">
            {state}
          </button>
        </form>
        {state === "Sign Up" ? (
          <p className="text-gray-400 text-center text-xs mt-4">
            Already have an account?{" "}
            <span
              className="text-blue-400 cursor-pointer  hover:underline"
              onClick={() => setState("Login")}
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-gray-400 text-center text-xs mt-4">
            Don't have an account?{" "}
            <span
              className="text-blue-400 cursor-pointer  hover:underline"
              onClick={() => setState("Sign Up")}
            >
              Sign up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
