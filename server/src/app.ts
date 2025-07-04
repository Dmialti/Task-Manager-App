import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import tasksRouter from "./routes/tasks";
import categoriesRouter from "./routes/categories";
import tagsRouter from "./routes/tags";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  })
);

app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "";
let cachedConnection: typeof mongoose | null = null;

const connectToDatabase = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    cachedConnection = await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
    return cachedConnection;
  } catch (error) {
    console.error("DB connection error:", error);
    throw error;
  }
};

// Middleware to ensure database connection
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    console.error("Failed to connect to database:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "Task Manager API is running", status: "healthy" });
});

app.use("/api/tasks", tasksRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/tags", tagsRouter);

export default app;
