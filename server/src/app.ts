import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import tasksRouter from "./routes/tasks";
import categoriesRouter from "./routes/categories";
import tagsRouter from "./routes/tags";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || "";
if (MONGO_URI) {
  mongoose.connect(MONGO_URI).catch((err) => {
    console.error("DB connection error:", err);
  });
}

app.use("/api/tasks", tasksRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/tags", tagsRouter);

export default app;
