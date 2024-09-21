require("dotenv").config();
const express = require("express");
const expressLayout = require("express-ejs-layouts");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const cors = require("cors");
const session = require("express-session");
const connectDB = require("./server/config/db");
const multer = require("multer");
const path = require("path");

const app = express();

// Connect to Database
app.use((req, res, next) => {
  console.log(`Request received at ${new Date()}`);
  next();
});

// Explicitly set the views directory
app.set("views", path.join(__dirname, "views"));

// Set the view engine to ejs
app.set("view engine", "ejs");

connectDB()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection failed", err));

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// Static Files
app.use(express.static("public"));
app.use(cors());

// Express Session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
  })
);

// Flash Messages
app.use(flash({ sessionKeyName: "flashMessage" }));

// Templating Engine
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/", require("./server/routes/customer"));

// Handle 404
app.get("*", (req, res) => {
  res.status(404).render("404");
});

// Export app for Vercel
module.exports = app;
