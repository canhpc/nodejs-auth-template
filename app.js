const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const csurf = require("csurf");

const app = express();
app.set("view engine", "ejs");

//parse incomming json request + form post.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setup session
app.use(
  session({
    secret: "change-to-good-secret",
    resave: false,
    saveUninitialized: false,
    name: "auth-demo-app",
    // cookie: { httpOnly: true, secure: true },
    store: new FileStore({ path: "./.sessions", retries: 0 }),
  })
);

//add csurf to prevent csrf attack.
app.use(csurf());
app.use((req, res, next) => {
  res.locals._csrfToken = req.csrfToken();
  next();
});

const isAuth = require("./middlewares/is-auth");
const layoutMiddleware = require("./middlewares/layout-data");
app.use(layoutMiddleware);

const authRoute = require("./routes/authentication");
app.use("/", authRoute);

app.get("/", (req, res) => {
  res.render("index", {});
});

app.get("/protected", isAuth, (req, res) => {
  res.render("protected", {});
});

app.get("/public", (req, res) => {
  res.render("public", {});
});

const PORT = 4040;
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
