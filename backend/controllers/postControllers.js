import { Posts } from "../models/posts.model.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Posts.find({});
    res.send(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getPostById = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(404).json({ error: "Post not Found", id: id });
  }
  try {
    const post = await Posts.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const createPost = async (req, res) => {
  const data = req.body;
  if (!data.title || !data.description || !data.poster) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const post = await Posts.create({
      title: data.title,
      description: data.description,
      poster: data.poster,
    });

    res.send({ status: "success", data: post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const editPost = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  if (!data.title || !data.description || !data.poster) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (!id) {
    return res.status(404).json({ error: "Post Not Found", id: id });
  }
  try {
    const post = await Posts.findByIdAndUpdate(
      id,
      {
        title: data.title,
        description: data.description,
        poster: data.poster,
      },
      { new: true }
    );
    res.send({ status: "success", data: post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(404).json({ error: "Post Not Found", id: id });
  }

  try {
    const post = await Posts.findById(id);

    if (!post) {
      return res.status(404).json({ error: "Post not found", id: id });
    }

    await post.deleteOne();

    res.send({ status: "success", message: "Post deleted successfully!" });
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
};
