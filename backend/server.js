import express from "express";
import { createServer } from "node:http";
import { dbConnection } from "./db.js";
import postRoutes from "./routes/postRoutes.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import userRoutes from "./routes/userRoutes.js";

const PORT = 3000;

const app = express();
const server = createServer(app);

// Connect to the database
const connect = dbConnection();
connect();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hola Amigo",
      version: "1.0.0",
      description: "Api Documentation for Hola Amigo",
    },
  },
  apis: ["./routes/postRoutes.js", "./routes/userRoutes.js"],
};

const specs = swaggerJsdoc(swaggerOptions);

// Serve Swagger UI at /api-docs endpoint
console.log('swagger options : '+ JSON.stringify(swaggerOptions));
console.log('swagger specs : '+ JSON.stringify(specs));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

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
