import { useState, useEffect } from "react";
import Footer from "./component/Footer";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
function App() {
  const { user } = useParams();
  const username = localStorage.getItem("user");
  const [data, setdata] = useState([]);
  const [allblogs, setallblogs] = useState([]);
  const [search, setsearch] = useState("");
  useEffect(() => {
    fetchblogs();
  }, []);
  const fetchblogs = async () => {
    try {
      const res = await fetch("https://blog-application-backend-new.onrender.com/blog", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("blogtoken")}`,
        },
      });
      const fetchdata = await res.json();
      if (res.ok) {
        setdata(fetchdata);
        setallblogs(fetchdata);
      }
    } catch (error) {
      console.log("display error", error);
    }
  };
  useEffect(() => {
    if (search === "") {
      setdata(allblogs);
    } else {
      const filteredData = allblogs.filter((item) => {
        return (
          item.author.name.toLowerCase().includes(search.toLowerCase()) ||
          item.category.toLowerCase().includes(search.toLowerCase()) ||
          item.tags.some((tag) =>
            tag.toLowerCase().includes(search.toLowerCase())
          ) ||
          item.title.toLowerCase().includes(search.toLowerCase())
        );
      });
      setdata(filteredData);
    }
  }, [search, allblogs]);
  return (
    <>
      <div>
         <div className="my-5 ml-10">
            <p>
              <span className="text-blue-600 font-extrabold text-3xl">
                MIND
              </span>
              <span className="text-red-600 font-bold text-2xl">STREAM</span>
            </p>
          </div>
        <nav className="flex gap-3 w-screen mx-5 mb-10 ml-10 my-5">
         
          <div className="w-[80%]">
            <input
              type="search"
              name="search"
              onChange={(e) => setsearch(e.target.value)}
              value={search}
              placeholder="Search Blogs... "
              className="border-gray-200 border w-full h-14 rounded-lg bg-gray-100 pl-5 text-lg font-semibold focus:outline-none "
            />
          </div>
          <div className="flex gap-5 bg-black w-[13%]  text-white text-center justify-center items-center text-xl font-semibold rounded-full h-12">
            <Link to={`/home/${user}/profile`}>
              <button className="">
                {username.charAt(0).toUpperCase()}
              </button>
            </Link>
          </div>
        </nav>

        <main className="ml-10">
          <p className="text-4xl font-semibold ">Blog posts</p>
          <p className="text-lg text-neutral-500 font-semibold pt-5">
            Here, We Shere tips, guides, and stories that inspire your next
            adventure.
          </p>

          {allblogs.length === 0 ? (
            <p className="text-center text-2xl font-semibold mt-10">
              No blogs available
            </p>
          ) : data.length === 0 ? (
            <p className="text-center text-2xl font-semibold mt-10">
              No blogs found
            </p>
          ) : (
            <div >
              <div className=" flex flex-wrap gap-5 mt-10  w-full">
                {data.map((item, index) => {
                  const createdAt = item.createdat;
                  const date = new Date(createdAt);
                  const formattedDate = date.toLocaleDateString("en-GB");
                  const stripHtml = (html) => {
                    return html.replace(/<\/?[^>]+(>|$)/g, ""); // Removes all HTML tags
                  };
                  return (
                    <>
                      <Link to={`/home/${user}/blog/${item._id}`}>
                        <div
                          key={index}
                          className="w-[400px] h-[500px] px-4 py-5 bg-gray-100 rounded-2xl flex flex-col gap-2"
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
                        </div>
                      </Link>
                    </>
                  );
                })}
              </div>
              <div>
                <ul className="flex pt-10 gap-5 flex-wrap ">
                  {data.map((item, index) => {
                    return (
                      <>
                        <li
                          key={index}
                          className="bg-gray-100 px-5 py-2 rounded-lg text-lg font-semibold  "
                        >
                          {item.category}
                        </li>
                      </>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
        </main>
        <div >
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
