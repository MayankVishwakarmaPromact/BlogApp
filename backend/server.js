import express from "express";
import { createServer } from "node:http";
import { dbConnection } from "./db.js";
import postRoutes from "./routes/postRoutes.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import userRoutes from "./routes/userRoutes.js";


import { readFile } from 'fs/promises';
const swaggerDocument = JSON.parse(
  await readFile(
    new URL('./apiDoc.json', import.meta.url)
  )
);

const PORT = 3000;

const app = express();
const server = createServer(app);

// Connect to the database
const connect = dbConnection();
connect();

// Serve Swagger UI at /api-docs endpoint
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Midilewares
app.use(express.json());

// CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Routes
app.use("/api", postRoutes);
app.use("/api/auth", userRoutes);

// Start the server
server.listen(PORT, () => {
  console.log("server running at Port : " + PORT);
});
