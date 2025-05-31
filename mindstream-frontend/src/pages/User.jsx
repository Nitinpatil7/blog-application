import React from "react";
//import {useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const User = () => {
  const { user } = useParams();
  // const location = useLocation();
  // const user= location.state;
  const userdata = localStorage.getItem("user");
  const navigate = useNavigate();

  useEffect(() => {
    fetchblogs();
  }, []);
  const [data, setdata] = useState([]);

  const fetchblogs = async () => {
    try {
      const res = await fetch("http://localhost:5000/blog", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("blogtoken")}`,
        },
      });
      const fetchdata = await res.json();
      if (res.ok) {
        const data = fetchdata.filter((id) => id.author._id === user);
        console.log("data", data);
        setdata(data);
      }
    } catch (error) {
      console.log("display error", error);
    }
  };
  const edithandler=(id)=>{
    console.log("editing blog id : ", id);
    navigate(`/home/${user}/profile/writeblog/${id}`)
  }


  const deletehandler=async(id)=>{
    console.log("deleting blog id : ", id)
    try {
      const res = await fetch(`http://localhost:5000/blog/${id}`,{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json",
          Authorization: `Bearer ${localStorage.getItem("blogtoken")}`
        },
      })
      if(res.ok){
        setdata(data.filter((post) => post._id !== id));
        console.log("Blog Deleted Successfully!")
      }
    } catch (error) {
      console.log("error from deleting blog", error)
    }

  }
  
  console.log(data);

  return (
    <>
      <div className="w-screen relative">
        <div className="pt-10 ">
          <div className="flex gap-2 mx-2 justify-between">
            <p>
              <span className="text-blue-600 font-extrabold text-3xl">
                MIND
              </span>
              <span className="text-red-600 font-bold text-2xl">STREAM</span>
            </p>
          <div className="flex gap-2">
          <Link to={`/home/${user}`}>
              <button className="bg-black px-2 py-2 rounded-xl text-white text-lg  ">
                {"Home"}
              </button>
            </Link>
            <Link to={`/login`}>
              <button className="bg-black px-3 py-2 rounded-xl text-white text-lg ">
                {"Log Out"}
              </button>
            </Link>
          </div>
          </div>

          <div className="pt-10 flex  flex-col items-center justify-center gap-1">
            <p className="text-5xl font-semibold bg-black text-white mb-5 py-5 px-8
            rounded-full">{userdata.charAt(0)}</p>
            <div className="flex flex-col items-center">
              <p className="text-3xl font-semibold pt-2">
                {userdata.toUpperCase()}
              </p>
              <p className="pt-2 text-2xl font-semibold">
                Posts: <span>{data.length}</span>
              </p>
            </div>
            {/* navigate(`/profile/${data.user._id}`,{state: data.user}) */}
            <Link to={`/home/${user}/profile/writeblog`}>
              <button className="mt-7 bg-black py-2 px-7 rounded-xl text-white font-bold text-lg">
                Write New Blog
              </button>
            </Link>
          </div>
        </div>
        <div className="pt-7 pl-20 ">
          <p className="text-3xl font-semibold pl-16 ">Your Posts: </p>

          <div className="w-screen flex flex-wrap gap-5 items-center justify-center ">
            {data.map((item, index) => {
              const createdAt = item.createdat;
              const date = new Date(createdAt);
              const formattedDate = date.toLocaleDateString("en-GB");
              const stripHtml = (html) => {
                return html.replace(/<\/?[^>]+(>|$)/g, ""); // Removes all HTML tags
              };
              return (
                <>
                 
                    <div
                      key={index}
                      className="w-[400px] h-[500px] px-4 py-4 bg-gray-100 rounded-2xl flex flex-col gap-2"
                    >
                      <img
                        src={item.images}
                        className="rounded-2xl h-[200px] w-full object-cover"
                      />

                      <p className="text-gray-500 font-semibold p-2 text-sm">
                        {formattedDate}
                      </p>

                      <p className="font-semibold text-xl h-[50px] overflow-hidden">
                        {item.title}
                      </p>

                      <p className="text-gray-500 font-semibold h-[50px] overflow-hidden">
                        {stripHtml(item.content)
                          .split(" ")
                          .slice(0, 15)
                          .join(" ") + "..."}
                      </p>

                      <div className="flex py-2 items-center gap-2">
                        Written by:
                        <p className="text-lg font-semibold">
                          {item.author.name}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <button 
                        onClick={()=>edithandler(item._id)}
                        className="text-xl font-semibold text-white bg-black px-10 py-1 rounded-xl">Edit</button>
                        <button
                        onClick={()=>deletehandler(item._id)} 
                        className="text-xl font-semibold text-white bg-black px-10 py-1 rounded-xl">Delete</button>
                      </div>
                    </div>
               
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
