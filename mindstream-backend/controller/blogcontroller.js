const Blog = require("../models/Blog")

//Create Blog 
exports.createblog= async(req,res)=>{
    try {
        const {title,content,category,tags,images}=req.body;

        if(!title || !content || !category){
            return res.status(400).json({
                message:"Title, Content and category are required!"
            })
        }
        const newblog = new Blog({
            author: req.user._id,
            title,
            content,
            category,
            tags,
            images,
            
        });
        await newblog.save()
        res.status(201).json(newblog)
    } catch (error) {
        res.status(500).json({error:error.message}) 
    }
}

//get all Blogs
exports.getallblogs = async(req,res)=>{
    try {
        const blogs = await Blog.find().populate("author", "name email");
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({error:error.message});

    }
}

//get blog of specific users
exports.getblogbyid = async(req,res)=>{
    try {
        const blog = await Blog.findById(req.params.id).populate("author", "name email").populate("comments.user","name email")

        if(!blog){
            return res.status(404).json({
                message:"Blog Not Found"
            })
        }
        res.status(200).json(blog)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

//update blog by user
exports.updateblog= async (req, res)=>{
    try {
        const blog = await Blog.findById(req.params.id);
        if(!blog){
            return res.status(404).json({message:"Blog Not Found"});
        }
        if(blog.author.toString()!==req.user._id.toString()){
            return res.status(403).json({message:"Unauthorized to update this blog"})
        }

        const {title , content , category , tags , images} = req.body;

        blog.title = title || blog.title;
        blog.content = content || blog.content;
        blog.category = category || blog.category;
        blog.tags = tags || blog.tags;
        blog.images = images || blog.images;

        await blog.save();
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}



//delete a blog

exports.deleteblog=async (req, res)=>{
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
          }
          if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized to delete this blog" });
          }

          await blog.deleteOne();
      res.status(200).json({message: "Blog Deleted Successfully"})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

//add a comment on a blog
exports. addcomment = async (req , res)=>{
    try {
        const {text} = req.body;
        if (!text) {
            return res.status(400).json({ message: "Comment text is required" });
          }
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
          }

        const newcomment = {
            user: req.user._id,
            text,
        }
        blog.comments.push(newcomment);
        await blog.save();

        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}
//comments only delete by author
exports.deletecomment=async (req, res)=>{
    try {
        const {commentid} = req.params;
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
          }

          const comment = blog.comments.find((c)=> c._id.toString()===commentid);

          if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
          }

          if(comment.user.toString() !== req.user._id.toString() && blog.author.toString() !== req.user._id.toString()){
            return res.status(403).json({ message: "Unauthorized to delete this comment" });
 
          }
          blog.comments = blog.comments.filter((c)=>c._id.toString() !== commentid);
          await blog.save();
res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({error: error.message})
    }

}