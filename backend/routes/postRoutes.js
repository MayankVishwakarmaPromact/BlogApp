import express from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  editPost,
  deletePost,
} from "../controllers/postControllers.js";
import { verifyLogin } from "../controllers/userControllers.js";

const postRoutes = express.Router();

postRoutes.get("/posts", getAllPosts);

postRoutes.get("/posts/:id", verifyLogin, getPostById);

postRoutes.post("/posts", verifyLogin, createPost);

postRoutes.put("/posts/:id", verifyLogin, editPost);

postRoutes.delete("/posts/:id", verifyLogin, deletePost);

export default postRoutes;
