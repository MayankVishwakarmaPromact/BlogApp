import axios from "axios";

const _baseUrl = "http://localhost:3000";

// Function for post operation
export const getAllPosts = async () => {
  try {
    const result = await axios.get(`${_baseUrl}/api/posts`);
    return result.data;
  } catch (error) {
    return { error: error.message }; // Return the error message
  }
};

export const getPostById = async (id) => {
  try {
    const result = await axios.get(`${_baseUrl}/api/posts/${id}`);
    return result.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const createPost = async (post) => {
  try {
    const result = await axios.post(`${_baseUrl}/api/posts`, post);
    return result.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const editPost = async (id, post) => {
  try {
    const result = await axios.put(`${_baseUrl}/api/posts/${id}`, post);
    return result.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const deletePost = async (id) => {
  try {
    const result = await axios.delete(`${_baseUrl}/api/posts/${id}`);
    return result.data;
  } catch (error) {
    return { error: error.message };
  }
};

// Functions for authentication
export const login = async (data) => {
  try {
    const result = await axios.post(`${_baseUrl}/api/auth/login`, data);
    return result.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const register = async (data) => {
  try {
    const result = await axios.post(`${_baseUrl}/api/auth/register`, data);
    return result.data;
  } catch (error) {
    return { error: error.message };
  }
};
