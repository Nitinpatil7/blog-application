import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../component/Footer";
import { Link } from "react-router-dom";
const Blog = () => {
  const { id } = useParams();
  const { user } = useParams();
  console.log("user id", user);
  console.log("blog id", id);
  console.log(id);
  useEffect(() => {
    if (id) {
      fetchblogs();
    }
  }, [id]);
  const [data, setdata] = useState(null);
  const [date, setdate] = useState("");
  const [comment, setcomment] = useState("");
  const [tags, settags] = useState([]);
  const [comments, setcomments] = useState([]);

  const fetchblogs = async () => {
    try {
      const res = await fetch(`http://localhost:5000/blog/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("blogtoken")}`,
        },
      });
      const fetchdata = await res.json();
      if (res.ok) {
        setdata(fetchdata);
        settags(fetchdata.tags);
        const createdAt = fetchdata.createdat;
        const date = new Date(createdAt);
        const formattedDate = date.toLocaleDateString("en-GB");
        setdate(formattedDate);
        setcomments(fetchdata.comments);
      }
    } catch (error) {
      console.log("display error", error);
    }
  };
  const clickhandler = async () => {
    try {
      const res = await fetch(`http://localhost:5000/blog/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("blogtoken")}`,
        },
        body: JSON.stringify({
          user: user,
          text: comment,
        }),
      });
      console.log("comment data",data)

      if (res.ok) {
        console.log("comment posted success");
        const newComment = {
          user: { name: localStorage.getItem("user") },
          text: comment,
          createdat: new Date().toISOString(),
        };
        setcomments((prevComments) => [newComment, ...prevComments]);
      }
      setcomment("");
    } catch (error) {
      console.log("Comment post error: ", error);
    }
  };

  return (
    <>
      <div className="h-max w-screen">
        <div className="pt-10 px-10 py-10 flex justify-between items-center">
          <p>
            <span className="text-blue-600 font-extrabold text-5xl">MIND</span>
            <span className="text-red-600 font-bold text-4xl">STREAM</span>
          </p>
         
        </div>
        <div>
          {Array.isArray(data) ? (
            data.map((item, index) => (
              <div key={index}>
                <img src={item.images} alt="Blog Image" />
                {/* <h1>{item.title}</h1>
                <p>{item.content}</p> */}
              </div>
            ))
          ) : data ? (
            <div className="w-screen flex flex-col">
              <div className="w-screen px-2 min-h-screen   ml-10 mr-2">
                <h1 className="text-3xl py-5  px-5 font-semibold ">
                  {data.title} :
                </h1>
                <img
                  className="h-96 w-screen rounded-xl"
                  src={data.images}
                  alt="Blog Image"
                />

                <p
                  dangerouslySetInnerHTML={{ __html: data.content }}
                  className="text-xl py-5 px-5"
                ></p>
                <p className="px-5">Posted At: {date}</p>
                <p className="px-5 text-lg font-semibold pb-5">
                  Posted By: {data.author.name}
                </p>
              </div>
              <div className="w-screen  px-10 py-10">
                <div>
                  <p className="text-3xl font-semibold">Category:</p>
                  <p className="bg-gray-200 text-center text-2xl font-semibold rounded-lg my-5 py-2 px-1">
                    {data.category}
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-semibold">Tags:</p>
                  <div className="flex flex-wrap gap-5 mr-2">
                    {tags.map((item, index) => {
                      return (
                        <p
                          className="text-2xl bg-gray-100 px-2 py-1 rounded-lg font-semibold"
                          key={index}
                        >
                          {item}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <div className="py-2 w-screen mx-10 ">
          <p className="text-2xl font-semibold">Comments:</p>
          <div className="flex gap-5 items-center">
            <input
              type="text"
              name="comment"
              value={comment}
              onChange={(e) => setcomment(e.target.value)}
              placeholder="Write Comment..."
              className="h-14 w-[95%] bg-gray-200 rounded-lg  my-5 text-xl font-semibold px-10 focus:outline-none "
            />
            <button
              onClick={() => clickhandler()}
              className="bg-black text-white h-14 rounded-lg text-lg font-semibold px-5"
            >
              Submit 
            </button>
          </div>
          <div className="px-10">
            {comments.map((item, index) => {
              const createdAt = item.createdat;
              const date = new Date(createdAt);
              const formattedDate = date.toLocaleDateString("en-GB");
              return (
                <>
                  <div key={index} className="bg-gray-100 my-2 pl-5 rounded-xl">
                    <p className="text-2xl font-semibold">{item.text}</p>
                    <div className="flex gap-5 pb-2">
                      <p className="text-gray-500 font-semibold">
                        comment by: {item.user.name}
                      </p>
                      <p className="">{formattedDate}</p>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Blog;
