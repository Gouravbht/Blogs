const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors());
mongoose.connect(
  "mongodb+srv://gouravb136:xMGRXkzlTuM2trUA@cluster0.so4kg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  slug: { type: String, required: true, unique: true },
});
const Blog = mongoose.model("Blog", BlogSchema);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
const User = mongoose.model("User", userSchema);

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split("")[1];
  if (!token) return;
  try {
    const decoded = jwt.verify(token, "secretkey");
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: "invalid token" });
  }
};

//Blogs api
app.get("/api/blogs", auth, async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ err: "failed to get blogs" });
  }
});
//Login api

app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: "Invalid username or password" });
  const match = await bcrypt.compare(password, user.password);
  //   if (!match) return;
  //   res.status(400).json({ message: "Invalid credentials" });
  const token = jwt.sign({ id: user._id }, "secretkey", {
    expiresIn: "24h",
  });
  res.json({ token });
});
app.listen(5000, () => console.log("Server running on 5000"));
