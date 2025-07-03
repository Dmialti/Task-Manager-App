import express from "express";
import cors from "cors";
import tasksRouter from "./routes/tasks";
import categoriesRouter from "./routes/categories";
import tagsRouter from "./routes/tags";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/tasks", tasksRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/tags", tagsRouter);

export default app;
