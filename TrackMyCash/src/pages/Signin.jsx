import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [signinform, setsigninform] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [msg, setmsg] = useState("");
  useEffect(() => {
    setsigninform({ name: "", email: "", password: "" });
  }, []);

  const changehandler = (e) => {
    setsigninform({ ...signinform, [e.target.name]: e.target.value });
  };

  const submithandler = async (e) => {
    e.preventDefault();
    try {
      const res =await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json", },

        body: JSON.stringify(signinform),
      });

      const data = await res.json();
      if (res.ok) {
        setsigninform({ ...signinform, [e.target.name]: e.target.value });
        setmsg("Registered Succesfully , Login now...");
      
        setTimeout(() => navigate("/login"), 1000);
        localStorage.setItem("token",data.token)
        console.log(data.token)

      } else if(data.message ==="User already Exists"){
        setmsg("user already exists. Redirect to Login...");
        setTimeout(() => {
          navigate("/login")
        }, 2000);
      }else{
        setmsg(data.message || "Registration Failed")
      }
    } catch (error) {
      setmsg("An error occurred. Please try again.");
      console.log(`Error : ${error}`);
    }
  };

  return (
    <>
     <div className="flex h-screen bg-blue-500  w-full">
     <div className="w-[60%] pr-10 pl-10 ">
     <p className="text-white pt-30 pb-10 pl-5 font-bold text-6xl ">
          TrackMy<span className="text-green-700">Cash</span>/-
        </p>
          <img
            className="rounded-bl-[40px] rounded-tl-[40px] rounded-br-[240px] rounded-tr-[240px] h-[60%]"
            src="src\assets\part1.png"
            alt=""
          />
        </div>
     <div className="flex flex-col h-screen bg-blue-500 pr-20 pt-40 w-[40%]">
       
        <div className="flex flex-col gap-5 pt-20">
          <form
            autoComplete="off"
            onSubmit={submithandler}
            className="flex flex-col gap-5 border-2 border-white w-[100%] p-5 rounded-2xl"
          >
            <p className="text-white font-bold text-2xl py-2 flex flex-col">
            <span>
            Sign In & Stay on Top of Your Budget!                   
            </span>
            <span>
            Smart decisions start with smart tracking! 
            </span>
            </p>
            <input
              name="name"
              autoComplete="off"
              onChange={changehandler}
              value={signinform.name}
              type="text"
              placeholder="Enter a Name"
              className="bg-white  h-12 pl-5 rounded-xl text-xl border-white"
            />
            <input
              onChange={changehandler}
              autoComplete="off"
              value={signinform.email}
              type="email"
              name="email"
              placeholder="Email "
              className="bg-white  h-12 pl-5 rounded-xl text-xl border-white"
            />
            <input
              onChange={changehandler}
              autoComplete="off"
              value={signinform.password}
              type="password"
              name="password"
              placeholder="Password"
              className="bg-white  h-12 pl-5 rounded-xl text-xl border-white"
            />

            <button className="bg-blue-950 py-2 rounded-2xl text-white font-semibold text-2xl">
              SignIn
            </button>
            <p className="text-white text-2xl font-bold">{msg}</p>

            <div className="flex gap-3 items-center pl-5">
              <p className="h-[2px] w-[45%] bg-white"></p>
              <span className="text-white text-lg">OR</span>
              <p className="h-[2px] w-[45%] bg-white"></p>
            </div>

            <button className="flex gap-5 items-center ml-[27%] text-xl font-semibold bg-white text-black border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2   hover:bg-slate-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ">
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
          </form>
        </div>
      </div>
     </div>
    </>
  );
};

export default Signin;
