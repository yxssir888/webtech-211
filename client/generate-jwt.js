const jwt = require("jsonwebtoken");

const payload = {
  role: "anon",
  iss: "supabase",
  iat: Math.floor(Date.now() / 1000),
  exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365
};

const secret = "mon-jwt-secret-tres-long-avec-32-caracteres-minimum";

const token = jwt.sign(payload, secret, { algorithm: "HS256" });

console.log("Ton token JWT :");
console.log(token);
