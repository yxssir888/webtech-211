const fs = require("fs");
const pathModule = require("path");
const express = require("express");
const router = express.Router();
const db = require("../lab2/model.db");
const cors = require("cors");  
//use cors middleware
router.use(cors());
// Middleware: log time for each request
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

// Home route
router.get("/", (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html>
      <head><meta charset="utf-8"><title>Home</title></head>
      <body>
        <h1>Welcome</h1>
        <p> <a href="/hello?name=Mohamed">/hello?name=Mohamed</a></p>
        <p> <a href="/about">/about</a></p>
      </body>
    </html>
  `;
  res.send(html);
});

// /hello route
router.get("/hello", (req, res) => {
  const name = req.query.name;
  if (name === "Mohamed") {
    res
      .type("text")
      .send(
        "Hello Mohamed! You are a thoughtful and methodical learner passionate about ethical tech."
      );
  } else if (name) {
    res.type("text").send("Hello " + name);
  } else {
    res.type("text").send("Hello anonymous");
  }
});

// /about route
router.get("/about", (req, res) => {
  try {
    const about = require("./content/about.json");
    res.type("application/json").send(JSON.stringify(about, null, 2));
  } catch (err) {
    res.status(500).type("text").send("Error loading about.json");
  }
});

// Dynamic route: /content/:filename
router.get("/content/:filename", (req, res) => {
  const filename = req.params.filename;
  const contentPath = pathModule.join(__dirname, "content", filename + ".json");
  if (fs.existsSync(contentPath)) {
    const fileContent = fs.readFileSync(contentPath);
    res.type("application/json").send(fileContent);
  } else {
    res.status(404).type("text").send("404 Not Found");
  }
});



//get list all articles
router.get("/articles", (req, res) => {
 
  console.log(db.articles);
  res.send(JSON.stringify(db.articles, null, 2));
});

//add a new article
router.post("/articles", express.json(), (req, res) => {

  const newArticle = req.body;
  db.articles.push(newArticle);
  res
    .status(201)
    .type("application/json")
    .send(JSON.stringify(newArticle, null, 2));
});

//get article by id
router.get("/articles/:id", (req, res) => {

  const article = db.articles.find((a) => a.id === req.params.id);
  if (article) {
    res.type("application/json").send(JSON.stringify(article, null, 2));
  } else {
    res.status(404).type("text").send("404 Not Found");
  }
});

//get all comments of the article with articleId
router.get("/articles/:id/comments", (req, res) => {

  const comments = db.comments.filter((c) => c.articleId === req.params.id);
  res.type("application/json").send(JSON.stringify(comments, null, 2));
});

//add a new comment to a specific article with articleId
router.post("/articles/:id/comments", express.json(), (req, res) => {

  const newComment = req.body;
  if (!db.articles.find((a) => a.id === req.params.id)) {
    return res.status(404).type("text").send("Article not found");
  }
  newComment.articleId = req.params.id;
  db.comments.push(newComment);
  res
    .status(201)
    .type("application/json")
    .send(JSON.stringify(newComment, null, 2));
});

//get a comment with commentId of the article with articleId
router.get("/articles/:articleId/comments/:commentId", (req, res) => {

  const comment = db.comments.find(
    (c) => c.articleId === req.params.articleId && c.id === req.params.commentId
  );
  if (comment) {
    res.type("application/json").send(JSON.stringify(comment, null, 2));
  } else {
    res.status(404).type("text").send("404 Not Found");
  }
});
// Catch-all 404 route
router.use((req, res) => {
  res.status(404).type("text").send("404 Not Found");
});

module.exports = router;
