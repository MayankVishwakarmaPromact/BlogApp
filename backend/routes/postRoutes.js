import express from "express";
import { getAllPosts, createPost } from "../controllers/postControllers.js";

const postRoutes = express.Router();
postRoutes.get("/", (req, res) => {
  res.send("<h1>MyBlogApp Api </h1>");
});

postRoutes.get("/posts", getAllPosts);

postRoutes.post("/posts", createPost);

export default postRoutes;
