import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginform, setloginform] = useState({ email: "", password: "" });
  const [msg, setmsg] = useState("");

  const changehandler = (e) => {
    setloginform({ ...loginform, [e.target.name]: e.target.value });
  };

  const submithandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginform),
      });
      const data = await res.json();
      if (res.ok) {
        setmsg("Logged Successfully!");
        setTimeout(() => navigate("/dashboard"), 1000);
        localStorage.setItem("token", data.token);
        console.log(data.token);
      } else {
        setmsg(data.message || "Login Failed!");
      }
    } catch (error) {
      setmsg("an error occured. please Try Again");
      console.log(`Error :- ${error}`);
    }
  };

  return (
    <>
      <div className="w-full h-full bg-blue-500 flex items-center">
        <div className="flex h-screen w-[40%]  ">
          <div className="flex w-[100%] flex-col pl-10">
            <p className="text-white pt-20 font-bold text-6xl ">
              TrackMy<span className="text-green-700">Cash</span>/-
            </p>
            <div className="flex flex-col gap-5 pt-20  h-[65%] items-center">
              {/* Added onSubmit to the form */}
              <form
                autoComplete="off"
                onSubmit={submithandler}
                className="flex flex-col gap-5 border-2 border-white w-[95%] p-5 justify-center rounded-2xl h-[100%]"
              >
                <p className="text-white font-bold text-3xl pl-5 py-2">
                   Welcome Back!
                  <p className="text-white font-bold pt-1  pb-5">
                    Log In to TrackMy<span className="text-green-700">Cash</span>/-
                  </p>
                </p>

                <input
                  type="text"
                  name="email"
                  onChange={changehandler}
                  value={loginform.email}
                  placeholder="Email "
                  className="bg-white h-12 pl-5 rounded-xl text-xl border-white"
                />
                <input
                  type="text"
                  name="password"
                  onChange={changehandler}
                  value={loginform.password}
                  placeholder="Password"
                  className="bg-white h-12 pl-5 rounded-xl text-xl border-white"
                />

                {/* Changed button type to "submit" */}
                <button
                  type="submit"
                  className="bg-blue-950 py-2 rounded-2xl text-white font-semibold text-2xl"
                >
                  SignIn
                </button>
                <p className="text-white font-bold text-2xl ">{msg}</p>
              </form>
            </div>
          </div>
        </div>
        <div className="w-[60%] pr-10 pl-10 ">
          <img
            className="rounded-bl-[350px] rounded-tl-[40px] rounded-b-[40px] rounded-tr-[200px]"
            src="src\assets\part1.png"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Login;
