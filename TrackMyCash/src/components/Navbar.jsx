import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <div className="flex bg-sky-500 h-16 justify-between items-center px-10">
        <div className=" flex-col justify-center pl-10">
          <p className="text-white font-bold text-3xl">TrackMy<span className="text-green-700">Cash</span>/-</p>
        </div>
        <div className="flex gap-2">
       <ul className="list-none flex ">
       <Link to="/">
         <li className=" py-3 px-7 rounded-xl text-white font-bold text-2xl hover:text-neutral-200 ">Home</li>
         </Link>
         <Link to="/Signin">
         <li className=" py-3 px-7 rounded-xl text-white font-semibold text-2xl hover:text-neutral-200">SignIn</li>
         </Link>
       
         <Link to="/Login">
         <li className=" py-3 px-7 rounded-xl text-white font-semibold text-2xl hover:text-neutral-200">LogIn</li>
         </Link>
       </ul>
         
        </div>
      </div>
    </>
  );
};

export default Navbar;
