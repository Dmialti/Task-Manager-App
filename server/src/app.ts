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
    return cachedConnection;
  } catch (error) {
    console.error("DB connection error:", error);
    throw error;
  }
};

if (MONGO_URI) {
  connectToDatabase();
}

app.use("/api/tasks", tasksRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/tags", tagsRouter);

export default app;
