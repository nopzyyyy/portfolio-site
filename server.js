
const express = require("express");
const multer = require("multer");
const path = require("path");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();

const upload = multer({ dest: "uploads/" });
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: "portfolio_secret_key",
  resave: false,
  saveUninitialized: true
}));

const USERNAME = "admin";
const PASSWORD = "12345"; // Change this!

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/admin", (req, res) => {
  if (req.session.loggedIn) {
    res.render("admin");
  } else {
    res.redirect("/login");
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === USERNAME && password === PASSWORD) {
    req.session.loggedIn = true;
    res.redirect("/admin");
  } else {
    res.send("Invalid credentials. <a href='/login'>Try again</a>");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  const fs = require("fs");
  const ext = path.extname(req.file.originalname);
  const newPath = path.join("uploads", req.file.filename + ext);
  fs.renameSync(req.file.path, newPath);
  res.redirect("/admin");
});

app.get("/images", (req, res) => {
  const fs = require("fs");
  const files = fs.readdirSync("uploads").map(file => "/uploads/" + file);
  res.json(files);
});

app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
