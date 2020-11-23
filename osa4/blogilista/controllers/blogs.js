const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

// Kaikkien blogien hakeminen
blogsRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs.map((blog) => blog.toJSON()));
  });
});

// Yksittäisen blogin hakeminen
blogsRouter.get("/:id", (request, response, next) => {
  Blog.findById(request.params.id)
    .then((blog) => {
      if (blog) {
        response.json(blog.toJSON());
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// Blogin lisääminen
blogsRouter.post("/", (request, response, next) => {
  const { body } = request;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  blog
    .save()
    .then((savedBlog) => {
      response.status(201).json(savedBlog.toJSON());
    })
    .catch((error) => next(error));
});

module.exports = blogsRouter;
