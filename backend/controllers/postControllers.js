import { Posts } from "../models/posts.model.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Posts.find({}); // Ensure 'Post' is your Mongoose model
    res.send(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const createPost = async (req, res) => {
  const data = req.body;
  if (!data.title || !data.description || !data.poster) {
    return res.status(404).json({ error: "All fields are required" });
  }

  const post = await Posts.create({
    title: data.title,
    description: data.description,
    poster: data.poster,
  });
  
  res.send(post);
};
