import express from 'express';
import mongoose from 'mongoose';
import taskRoutes from './routes/tasks.js';
import cors from 'cors'; 



const app = express();
const PORT = 3000;

// Middleware
app.use(express.json()); // Parse JSON requests

app.use(cors());
app.use(taskRoutes);

await mongoose.connect("mongodb://localhost:27017/todo-app");
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));




// Server start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
