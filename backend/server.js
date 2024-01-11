import express from 'express';
import { createServer } from 'node:http';
import { dbConnection } from './db.js';
import postRoutes from './routes/postRoutes.js';
import cors from 'cors';

const PORT = 3000;

const app = express();
const server = createServer(app);

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
  console.log('server running at http://myblogapp.com:'+PORT);
});