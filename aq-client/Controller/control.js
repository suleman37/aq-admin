const Blog = require("../Model/blog_model");

// Get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single blog by ID
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new blog
const createBlog = async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    image: req.body.image,
    content: req.body.content,
  });

  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a blog by ID
const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (req.body.title) blog.title = req.body.title;
    if (req.body.author) blog.author = req.body.author;
    if (req.body.image) blog.image = req.body.image;
    if (req.body.content) blog.content = req.body.content;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a blog by ID
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    await blog.remove();
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};