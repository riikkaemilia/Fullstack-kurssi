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
  return mostLikes;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
