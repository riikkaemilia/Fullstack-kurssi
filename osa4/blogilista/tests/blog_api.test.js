/* eslint-disable no-undef */
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "Lovely Blog",
    author: "Amazing Writer",
    url: "http://url.fi",
    likes: 5,
  },
  {
    title: "Bad Blog",
    author: "Horrible Writer",
    url: "http://url.com",
    likes: 7,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();

  await User.deleteMany({});
  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({ username: "root", passwordHash });
  await user.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there is the right amound of blogs", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(initialBlogs.length);
});

test("all blogs have identification field called 'id'", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body.map((blog) => blog.id)).toBeDefined();
});

// Blogin lisäys ilman tokenia ei toimi
test("adding a blog without token fails", async () => {
  const newBlog = {
    title: "New Cool Title",
    author: "Very Cool Author",
    url: "http://cool_url.com",
    likes: 5,
  };

  await api.post("/api/blogs").send(newBlog).expect(401);
});

// Varmistaa, että blogin voi lisätä listaan post-pyynnöllä ja varmistaa oikean sisällön
test("a blog is added to blogs list", async () => {
  const login = await api.post("/api/login").send({
    username: "root",
    password: "sekret",
  });

  const { token } = login.body;

  const newBlog = {
    title: "New Cool Title",
    author: "Very Cool Author",
    url: "http://cool_url.com",
    likes: 5,
  };

  const initialBlogsTest = await api.get("/api/blogs");

  await api
    .post("/api/blogs")
    .set("Authorization", `bearer ${token}`)
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const titles = response.body.map((r) => r.title);

  expect(response.body).toHaveLength(initialBlogsTest.body.length + 1);
  expect(titles).toContainEqual("New Cool Title");
});

// Varmistaa, että likes-arvoksi annetaan 0 jos sille ei ole annettu arvoa
test("a blog without amount of likes receives likes value of 0", async () => {
  const login = await api.post("/api/login").send({
    username: "root",
    password: "sekret",
  });

  const { token } = login.body;

  const newBlog = {
    title: "Cool Blog Without Likes",
    author: "Very Cool Author",
    url: "http://cool_url.com",
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `bearer ${token}`)
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
  const login = await api.post("/api/login").send({
    username: "root",
    password: "sekret",
  });

  const { token } = login.body;

  const newBlog = {
    title: "jou jou jou",
    author: "Very Cool Author",
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `bearer ${token}`)
    .send(newBlog)
    .expect(400)
    .expect("Content-Type", /application\/json/);
});

afterAll(async () => {
  await mongoose.connection.close();
});
