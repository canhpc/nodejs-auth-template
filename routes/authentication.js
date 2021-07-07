const express = require("express");
const auth = require("../controllers/authentication");

const route = express.Router();
route.get("/login", auth.getLogin);
route.post("/login", auth.postLogin);
route.post("/logout", auth.postLogout);
module.exports = route;
