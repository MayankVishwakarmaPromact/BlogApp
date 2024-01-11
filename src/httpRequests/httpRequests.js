import axios from "axios";
export const getAllPosts = async () => {
  const result = await axios.get("http://localhost:3000/api/posts");
  return result.data;
};
export const createPost = async (post) => {
  const result = await axios.post("http://localhost:3000/api/posts",post);
  return result.data;
};
