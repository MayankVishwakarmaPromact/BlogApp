import axios from "axios";
export const getAllPosts = async () => {
  const result = await axios.get(`http://localhost:3000/api/posts`);
  return result.data;
};
export const getPostById = async (id) => {
  const result = await axios.get(`http://localhost:3000/api/posts/${id}`);
  return result.data;
};
export const createPost = async (post) => {
  const result = await axios.post(`http://localhost:3000/api/posts`, post);
  return result.data;
};
export const editPost = async (id, post) => {
  const result = await axios.put(`http://localhost:3000/api/posts/${id}`, post);
  return result.data;
};
export const deletePost = async (id) => {
  const result = await axios.delete(`http://localhost:3000/api/posts/${id}`);
  return result.data;
};
