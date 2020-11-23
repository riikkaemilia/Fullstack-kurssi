const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  const mostLikes = blogs.reduce((accumulator, currentValue) =>
    accumulator.likes > currentValue.likes ? accumulator : currentValue
  );
  return {
    title: mostLikes.title,
    author: mostLikes.author,
    likes: mostLikes.likes,
  };
};

const mostBlogs = (blogs) => {
  const authorsBlogs = _(blogs)
    // Group the elements of Array based on author property
    .groupBy("author")
    // `key` is group's name (author), `value` is the array of objects
    .map((value, key) => ({ author: key, blogs: value.length }))
    .value();

  return _.maxBy(authorsBlogs, "blogs");
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
