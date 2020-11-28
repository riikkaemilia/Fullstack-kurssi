const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

// Kaikkien blogien hakeminen
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
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

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  });

  const savedBlog = await blog.save();
  response.json(savedBlog.toJSON());
});

module.exports = blogsRouter;
