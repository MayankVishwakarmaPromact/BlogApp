import express from 'express';
import { createServer } from 'node:http';
import { dbConnection } from './db.js';
import postRoutes from './routes/postRoutes.js';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const PORT = 3000;

const app = express();
const server = createServer(app);


const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MyBlogApp',
      version: '1.0.0',
      description: 'Api Documentation for MyBlogApp',
    },
  },
  // Path to the API docs
  apis: ['./routes/*.js'], // Replace with the actual path to your route files
};

const specs = swaggerJsdoc(swaggerOptions);

// Serve Swagger UI at /api-docs endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


// Midilewares
app.use(express.json());

// CORS middleware
app.use(cors({
  origin: 'http://localhost:5173',
}));

// Connect to the database
const connect = dbConnection();
connect();

// Routes
app.use('/api', postRoutes);


// Start the server
server.listen(PORT, () => {
  console.log('server running at Port : '+PORT);
});