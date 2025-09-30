const express = require("express");
const app = express();
const router = require("./handles");

// Use the router for all routes
app.use("/", router);
// Start the server
app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});