import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [signdata, setsigndata] = useState({
    username: "",
    signemail: "",
    signpassword: "",
  });
  const [msg, setmsg] = useState("");
  const changehandler = (e) => {
    setsigndata({ ...signdata, [e.target.name]: e.target.value });
  };
  const submithandler = async () => {
      try {
        const res = await fetch("http://localhost:5000/auth/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            {
              name: signdata.username,
              email: signdata.signemail,
              password:signdata.signpassword
            }
          ),
        });
        const data = await res.json();
        if (res.ok) {
          setsigndata({
            username: "",
            signemail: "",
            signpassword: "",
          });
          setmsg("User Registered Successfully");
          setTimeout(() => navigate("/login"), 1000);

        } else if (data.message === "User Already Exists ") {
          setmsg("user already exists . keep loging..");
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        } else {
          setmsg(data.message || "Registartion Failed");
        }
      } catch (error) {
        setmsg(error || "An error Occured. Please Try Again.");
        console.log(`signup Error : ${error}`);
      }
    console.log(signdata);
  };
  return (
    <>
      <div className="lg:w-screen lg:flex">
        <div className="w-[50%]  h-screen hidden lg:block">
          <img
            src="src\assets\image.png"
            alt=""
           className="w-full h-full object-cover"
          />
        </div>


          <div className="flex flex-col mt-15 text-center w-full lg:w-[50%] ">
            <h1 className=" py-2 mx-10 text-3xl font-bold">
              Welcome TO{" "}
              <span className="text-blue-600 font-extrabold text-4xl">
                MIND
              </span>
              <span className="text-red-600 font-bold text-3xl">STREAM</span>{" "}
            </h1>
            <p className=" text-xl py-2 text-gray-600">
              Please enter your details
            </p>
            <label className="flex flex-col text-xl font-semibold py-3 gap-2">
              User Name
              <input
                type="text"
                name="username"
                onChange={changehandler}
                value={signdata.username}
                id="username"
                className="border-gray-300 border w-[85%] mx-10 h-14 rounded-[5px] pl-5 text-lg font-semibold focus:outline-none "
              />
            </label>
            <label className="flex flex-col text-xl font-semibold py-3 gap-2">
              Email address
              <input
                type="email"
                name="signemail"
                onChange={changehandler}
                value={signdata.signemail}
                id="email"
                className="border-gray-300 border w-[85%] mx-10 h-14 rounded-[5px] pl-5 text-lg font-semibold focus:outline-none "
              />
            </label>
            <label className="flex flex-col text-xl font-semibold py-3 gap-2 pb-5">
              Password
              <input
                type="password"
                name="signpassword"
                onChange={changehandler}
                value={signdata.signpassword}
                id="password"
                className="border-gray-300 border w-[85%] mx-10 h-14 rounded-[5px] pl-5 text-lg font-semibold focus:outline-none "
              />
            </label>
            <button
              onClick={() => submithandler()}
              className="border-gray-300 border w-[85%] mx-10 h-14 rounded-[5px] pl-5 text-xl text-white font-bold py-2  bg-purple-700"
            >
              Sign In
            </button>
            <p className="text-xl font-semibold mx-10 pt-5 ">{msg}</p>

            <div className="flex gap-3 w-[85%] items-center justify-center mx-10 py-10">
              <p className="w-[45%] h-[2px] bg-gray-600"></p>
              <p className="text-gray-600 font-semibold text-xl ">OR</p>
              <p className="w-[45%] h-[2px] bg-gray-600"></p>
            </div>

            <button className="flex gap-5 items-center justify-center text-xl font-semibold bg-white text-black border border-gray-300 rounded-lg shadow-md max-w-[85%] mx-10 px-6 py-2   hover:bg-slate-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ">
              <svg
                className="h-6 w-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="-0.5 0 48 48"
                version="1.1"
              >
                <g
                  id="Icons"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g
                    id="Color-"
                    transform="translate(-401.000000, -860.000000)"
                  >
                    <g
                      id="Google"
                      transform="translate(401.000000, 860.000000)"
                    >
                      <path
                        d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                        id="Fill-1"
                        fill="#FBBC05"
                      >
                        {" "}
                      </path>
                      <path
                        d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                        id="Fill-2"
                        fill="#EB4335"
                      >
                        {" "}
                      </path>
                      <path
                        d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                        id="Fill-3"
                        fill="#34A853"
                      >
                        {" "}
                      </path>
                      <path
                        d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                        id="Fill-4"
                        fill="#4285F4"
                      >
                        {" "}
                      </path>
                    </g>
                  </g>
                </g>
              </svg>
              <span>Continue with Google</span>
            </button>

            <p className="flex   justify-center py-10 gap-1">
              <span className="text-lg text-gray-500 font-semibold">
                You have an account?{" "}
              </span>
              <Link to={"/login"}>
                <span className="text-lg text-purple-700 underline font-semibold">
                  Log In
                </span>
              </Link>
            </p>
          </div>
      </div>
    </>
  );
};

export default Login;
