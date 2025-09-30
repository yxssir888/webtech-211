const express = require("express");
const app = express();
const router = require("./handles");

app.use("/", router);

app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});
