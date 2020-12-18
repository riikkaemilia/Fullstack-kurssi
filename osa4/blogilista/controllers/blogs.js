/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");

// Kaikkien blogien hakeminen
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs.map((blog) => blog.toJSON()));
});

// Yksittäisen blogin hakeminen
blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog.toJSON());
  } else {
    response.status(404).end();
  }
});

// Blogin lisääminen
blogsRouter.post("/", async (request, response) => {
  const { body } = request;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.json(savedBlog.toJSON());
});

// Blogin poistaminen
blogsRouter.delete("/:id", async (request, response) => {
  const blog = await Blog.findByIdAndRemove(request.params.id);
  if (blog) {
    response.status(204).end();
  } else {
    response.status(404).end();
  }
});

// Blogin muokkaaminen
blogsRouter.put("/:id", async (request, response) => {
  const { body } = request;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
    context: "query",
  });
  if (updatedBlog === null) {
    response.status(404).end();
  } else {
    response.json(updatedBlog.toJSON());
  }
});

module.exports = blogsRouter;
