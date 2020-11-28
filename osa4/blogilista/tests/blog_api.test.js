/* eslint-disable no-undef */
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are seven blogs", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(7);
});

test("all blogs have identification field called 'id'", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body.map((blog) => blog.id)).toBeDefined();
});

// Varmistaa, että blogin voi lisätä listaan post-pyynnöllä ja varmistaa oikean sisällön
test("a blog is added to blogs list", async () => {
  const newBlog = {
    title: "New Cool Title",
    author: "Very Cool Author",
    url: "http://cool_url.com",
    likes: 5,
  };

  const initialBlogs = await api.get("/api/blogs");

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const titles = response.body.map((r) => r.title);

  expect(response.body).toHaveLength(initialBlogs.body.length + 1);
  expect(titles).toContainEqual("New Cool Title");
});

// Varmistaa, että likes-arvoksi annetaan 0 jos sille ei ole annettu arvoa
test("a blog without amount of likes receives likes value of 0", async () => {
  const newBlog = {
    title: "Cool Blog Without Likes",
    author: "Very Cool Author",
    url: "http://cool_url.com",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const newBlogResponse = await response.body.find(
    ({ title }) => title === "Cool Blog Without Likes"
  );

  expect(newBlogResponse.likes).toBe(0);
});

// jos uusi blogi ei sisällä kenttiä title ja url, vastataan statuskoodilla 400 Bad request
test("blog without title and url will receive code 400 bad request", async () => {
  const newBlog = {
    title: "jou jou jou",
    author: "Very Cool Author",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400)
    .expect("Content-Type", /application\/json/);
});

afterAll(async () => {
  await mongoose.connection.close();
});