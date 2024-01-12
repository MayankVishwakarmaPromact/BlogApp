import express from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  editPost,
  deletePost,
} from "../controllers/postControllers.js";

const postRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Operations related to posts
 */

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: [{ title: string, description: string, poster: string }]
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { error: 'message' }
 */
postRoutes.get("/posts", getAllPosts);

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Get post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { title: string, description: string, poster: string }
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { error: 'message' }
 */
postRoutes.get("/posts/:id", getPostById);

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {status: 'success', data: { title: string, description: string, poster: string }}
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { error: 'message' }
 */
postRoutes.post("/posts", createPost);

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Update a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               poster:
 *                 type: string
 *             example:
 *               title: "Updated Title"
 *               description: "Updated Description"
 *               poster: "Updated Poster"
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {status: 'success', data: { title: string, description: string, poster: string }}
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { error: 'message' }
 */

postRoutes.put("/posts/:id", editPost);

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Delete post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { status: "success", message: "Post deleted successfully!" }
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example: { error: 'message' }
 */
postRoutes.delete("/posts/:id", deletePost);

export default postRoutes;
