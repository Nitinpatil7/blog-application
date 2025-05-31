import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [logindata, setlogindata] = useState({ logemail: "", logpassword: "" });
  const [msg, setmsg] = useState("");
  const changehandler = (e) => {
    setlogindata({ ...logindata, [e.target.name]: e.target.value });
  };
  const submithandler = async () => {
    if (logindata.logemail !== "" && logindata.logemail !== "") {
      try {
        const res = await fetch("http://localhost:5000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: logindata.logemail,
            password: logindata.logpassword,
          }),
        });
        const data = await res.json();
        console.log("logged data : ",data)
        if (res.ok) {
          setmsg("Login SuccessFully!");
          setTimeout(() => {
            navigate(`/home/${data.user._id}`)
          }, 1000);
          localStorage.setItem("blogtoken", data.token);
          localStorage.setItem("user", data.user.name);
          console.log(data.user.name)
          console.log(data.token);
        } else {
          setTimeout(() => {
            navigate(`/signup`)
          }, 1000);
          setmsg("User not found, Please Sign Up");
        }
      } catch (error) {
        
        setmsg(`loged error : ${error}`);
      }
      console.log(logindata);
    } else {
      setmsg("Enter all required Fields");
    }
  };
  return (
    <>
      <div className="lg:flex lg:w-screen">
        <div className="h-screen  lg:w-[50%]   mt-20">
          <p className="absolute top-15 left-10">
            <span className="text-blue-600 font-extrabold text-3xl">MIND</span>
            <span className="text-red-600 font-bold text-2xl">STREAM</span>
          </p>

          <div className="mt-40  flex flex-col text-center  w-full  ">
            <h1 className=" py-2 text-3xl font-semibold">Welcome back</h1>
            <p className=" text-xl py-2 text-gray-600">
              Please enter your details
            </p>
            <label className="flex flex-col text-xl font-semibold py-3 gap-2">
              Email address
              <input
                onChange={changehandler}
                value={logindata.logemail}
                type="email"
                name="logemail"
                id="email"
                className="border-gray-300 border w-[85%] mx-10 h-14 rounded-[5px] pl-5 text-lg font-semibold focus:outline-none "
              />
            </label>
            <label className="flex flex-col text-xl font-semibold py-3 gap-2">
              Password
              <input
                type="password"
                name="logpassword"
                onChange={changehandler}
                value={logindata.logpassword}
                id="password"
                className="border-gray-300 border w-[85%] mx-10 h-14 rounded-[5px] pl-5 text-lg font-semibold focus:outline-none "
              />
            </label>
            <button
              onClick={() => submithandler()}
              className="border-gray-300 border w-[85%] mx-10 h-14 rounded-[5px] pl-5 text-xl text-white font-bold py-2 mt-5 bg-purple-700"
            >
              Sign In
            </button>
            <p className="text-xl font-semibold pt-5">{msg}</p>
            <p className=" py-2 gap-1">
              <span className="text-lg text-gray-500 font-semibold">
                Don't have an account?{" "}
              </span>
              <Link to={"/signup"}>
                <span className="text-lg text-purple-700 underline font-semibold">
                  {" "}
                  Sign Up
                </span>
              </Link>
            </p>
          </div>
        </div>

        <div className="w-[50%] h-screen hidden lg:block ">
          <img
          className="w-full h-full object-cover"
            src="src\assets\login.png"
            alt=""
            
          />
        </div>
      </div>
    </>
  );
};

export default Login;
