import express from "express";
import Task from "../models/Task";

const router = express.Router();

router.get("/", async (req, res) => {
  const filter = req.query.filter;
  let query = { completed: filter === "active" ? false : true };
  const tasks = await Task.find(query);
  res.json(tasks);
});

router.post("/", async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});

router.put("/:id", async (req, res) => {
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
