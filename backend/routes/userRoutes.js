import express from "express";
import { login } from "../controllers/userControllers.js";

const userRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Operations related to user authentication
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: "email@holamaigo.com"
 *               password: "password"
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
userRoutes.post("/login", login);
export default userRoutes;
