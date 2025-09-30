const fs = require("fs");
const pathModule = require("path");
const express = require("express");
const router = express.Router();

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
        <p>Try <a href="/hello?name=Adja">/hello?name=Adja</a></p>
        <p>Or <a href="/about">/about</a></p>
      </body>
    </html>
  `;
  res.send(html);
});

// /hello route
router.get("/hello", (req, res) => {
  const name = req.query.name;
  if (name === "Adja") {
    res
      .type("text")
      .send(
        "Hello Adja! You are a thoughtful and methodical learner passionate about ethical tech."
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

// Catch-all 404 route
router.use((req, res) => {
  res.status(404).type("text").send("404 Not Found");
});

module.exports = router;
