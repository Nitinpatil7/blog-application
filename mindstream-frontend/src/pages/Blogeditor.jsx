import React, { useState } from "react";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import Quill from "quill";
import ImageResize from "quill-image-resize-module-react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
Quill.register("modules/imageResize", ImageResize);

const Editor = () => {
  const navigate = useNavigate();
  const { user } = useParams();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [images, setimages] = useState("");

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
    imageResize: {
      parchment: Quill.import("parchment"),
    },
  };
  useEffect(() => {
    if (id) {
      fetchblogs();
    }
  }, [id]);
  const [editedblog, seteditedblog] = useState([]);
  const fetchblogs = async () => {
    try {
      const res = await fetch(`http://localhost:5000/blog/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("blogtoken")}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        seteditedblog(data);
        setTitle(data.title || "");
        setCategory(data.category || "");
        setTags(data.tags ? data.tags.join(", ") : "");
        setContent(data.content || "");
        setimages(data.images || "");
      }
    } catch (error) {
      console.log("display error", error);
    }
  };
  console.log("edited blog ", editedblog)

  const handleSave = async () => {
    const trimmedCategory = category.trim();
    const formattedTags = tags.split(",").map((tag) => tag.trim());

    // const plainTextContent = content.replace(/<[^>]+>/g, "");

    try {
      const url = id ? `http://localhost:5000/blog/${id}` : "http://localhost:5000/blog";
      const method = id ? "PUT" : "POST";
  
      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("blogtoken")}`,
        },
        body: JSON.stringify({
          author: user,
          title: title,
          content: content,
          category: trimmedCategory,
          tags: formattedTags,
          images: images,
        }),
      });
  
      if (res.ok) {
        alert(id ? "Blog Updated Successfully!" : "Blog Posted Successfully!");
        setTitle("");
        setCategory("");
        setTags("");
        setContent("");
        setimages("");
  
        setTimeout(() => {
          navigate(`/home/${user}/profile`);
        },500);
      } else {
        console.log("Error saving blog", res.statusText);
      }
    } catch (error) {
      console.log("Blog operation error", error);
    }
  //  if(id){
  //   try {
  //     const res = await fetch(`http://localhost:5000/blog/${id}`,{
  //       method:"PUT",
  //       headers:{
  //         "Content-Type":"application/json",
  //         Authorization:`Bearer ${localStorage.getItem("blogtoken")}`
  //       },
  //       body:JSON.stringify({
  //         author: user,
  //         title: title,
  //         content: content,
  //         category: trimmedCategory,
  //         tags: formattedTags,
  //         images: images,
  //       })
  //     });
  //     if(res.ok){
  //       console.log("Updated Successfully");
  //       setTimeout(()=>{
  //         navigate(`/home/${user}/profile`)
  //       },500)
  //     }
  //   } catch (error) {
  //     console.log("Update blog errro", error)
      
  //   }

  //  }else{
  //   try {
  //     const res = await fetch("http://localhost:5000/blog", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("blogtoken")}`,
  //       },
  //       body: JSON.stringify({
  //         author: user,
  //         title: title,
  //         content: content,
  //         category: trimmedCategory,
  //         tags: formattedTags,
  //         images: images,
  //       }),
  //     });
  //     //const data = await res.json();
  //     if (res.ok) {
  //       alert("Blog Posted Successfully!");
  //       setTitle("");
  //       setCategory("");
  //       setTags("");
  //       setContent("");
  //       setimages("");
  //       setTimeout(() => {
  //         navigate(`/home/${user}/profile`);
  //       }, 1000);
  //     }
  //   } catch (error) {
  //     console.log("blog error", error);
  //   }
  //  }
  };

  return (
    <div className="p-10 h-screen w-screen">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-semibold">{id?"Edit a Blog":"Write a Blog"}</h2>
        <button
          onClick={handleSave}
          className="bg-black text-white text-xl font-semibold py-2 px-5 rounded-lg"
        >
          Save Post
        </button>
      </div>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-1/3 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-2/3 p-2 border rounded"
        />
      </div>

      <input
        type="text"
        placeholder="Enter image string"
        value={images}
        onChange={(e) => setimages(e.target.value)}
        className="mb-4 border p-2 rounded"
      />

      {images && (
        <img
          src={images}
          alt="Thumbnail"
          className="mb-4 w-40 h-40 object-cover rounded"
        />
      )}

      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        modules={modules}
        className="h-[550px] rounded"
      />
    </div>
  );
};

export default Editor;
