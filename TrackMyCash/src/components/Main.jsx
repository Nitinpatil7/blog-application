import { Link } from "react-router-dom";
const Main = () => {
  return (
    <>
        <div className="items-center h-screen flex justify-between">
        
        <div className=" flex flex-col justify-center w-[30%] pl-20 gap-10">
          <div className=" font-bold text-4xl flex flex-col pr-5">
            <p className="text-5xl text-[#4C51BF]">
              Your financial journey starts here
            </p>
            <p className="text-[#5182ed] font-semibold">
          
              Abuild and track your budget effortlessly 🌱💡
            </p>
          </div>

          <div className=" flex items-center text-2xl font-bold text-blue-900 gap-5">
            <Link to={"/Signin"}>
            <button className="bg-blue-200 px-14 rounded-2xl py-4" >SignUp</button>
            </Link>
           <Link to={"/Login"}>
           <button className="bg-blue-200 px-14 rounded-2xl py-4">LogIn</button></Link>
          </div>
        </div>
        <div className="w-[70%] pr-10 ">
          <img
            className="rounded-2xl border-4 border-x-purple-500 border-y-blue-500"
            src="src\assets\part1.png"
            alt=""
          />
        </div>
      </div>

      <div className="w-full h-2 bg-[#A3BFFA]"></div>

      <div className="items-center h-screen flex">
        <div className="w-[70%] pr-10 pl-20">
          <img
            className="rounded-2xl border-4 border-x-purple-500 border-y-blue-500"
            src="src\assets\part2.png"
            alt=""
          />
        </div>
        <div className=" flex flex-col justify-center w-[30%] pr-10 gap-10">
          <div className=" font-bold text-4xl flex flex-col">
            <p className="text-5xl text-[#4C51BF]">
              Your financial journey starts here
            </p>
            <p className="text-[#5182ed] font-semibold">
            
              Abuild and track your budget effortlessly 🌱💡.
            </p>
          </div>

        </div>
      </div>

      <div className="w-full h-2 bg-[#A3BFFA]"></div>

      <div className="items-center h-screen flex">
        <div className=" flex flex-col justify-center w-[30%] pl-10 gap-10">
          <div className=" font-bold text-4xl flex flex-col">
            <p className="text-5xl text-[#4C51BF]">Simplify your finances</p>
            <p className="text-[#5182ed] font-semibold">
             
              add, modify, or remove expenses to stay on track 📊📝.
            </p>
          </div>

          <div className=""></div>
        </div>

        <div className="w-[70%] pl-20 pr-10">
          <img
            className="rounded-2xl border-4 border-x-purple-500 border-y-blue-500"
            src="src\assets\part3.png"
            alt=""
          />
        </div>
      </div>

      <div className="w-full h-2 bg-[#A3BFFA]"></div>

      <div className="items-center h-screen flex">
        <div className="w-[70%] pr-10 pl-10">
          <img
            className="rounded-2xl border-4 border-x-purple-500 border-y-blue-500"
            src="src\assets\part4.png"
            alt=""
          />
        </div>
        <div className=" flex flex-col justify-center w-[30%] pr-10 gap-10">
          <div className=" font-bold text-4xl flex flex-col">
            <p className="text-5xl text-[#4C51BF]">
              Track all your expenses in one place
            </p>
            <p className="text-[#5182ed] font-semibold">
              gain clarity and control over your spending 🧐💸.
            </p>
          </div>

          <div className=""></div>
        </div>
      </div>
    </>
  );
};

export default Main;
