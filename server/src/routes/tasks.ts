import express, { Request, Response } from "express";
import Task from "../models/Task";
import Tag from "../models/Tag";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const {
      filter,
      page = 1,
      limit = 10,
      sort = "createdAt",
      order = "desc",
      search,
    } = req.query;

    let query: any = {};

    if (filter === "active") {
      query.completed = false;
    } else if (filter === "completed") {
      query.completed = true;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const sortOrder = order === "asc" ? 1 : -1;
    let sortObj: any = {};

    if (sort === "priority") {
      const priorityOrder = {
        urgent: 4,
        high: 3,
        medium: 2,
        low: 1,
      };

      const aggregationPipeline = [
        { $match: query },
        {
          $addFields: {
            priorityValue: {
              $switch: {
                branches: [
                  { case: { $eq: ["$priority", "urgent"] }, then: 4 },
                  { case: { $eq: ["$priority", "high"] }, then: 3 },
                  { case: { $eq: ["$priority", "medium"] }, then: 2 },
                  { case: { $eq: ["$priority", "low"] }, then: 1 },
                ],
                default: 0,
              },
            },
          },
        },
        { $sort: { priorityValue: sortOrder as 1 | -1 } },
        { $skip: skip },
        { $limit: Number(limit) },
      ];

      const tasks = await Task.aggregate(aggregationPipeline);

      await Task.populate(tasks, [
        { path: "category", select: "name" },
        { path: "tags", select: "name color" },
      ]);

      const total = await Task.countDocuments(query);

      res.json({
        tasks,
        pagination: {
          current: Number(page),
          total: Math.ceil(total / Number(limit)),
          count: tasks.length,
          totalItems: total,
        },
      });
    } else {
      sortObj[sort as string] = sortOrder;
    }
    const tasks = await Task.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(Number(limit))
      .populate("category", "name")
      .populate("tags", "name color");

    const tasksWithCleanedTags = tasks.map((task) => {
      if (task.tags) {
        task.tags = task.tags.filter((tag) => tag !== null);
      }
      return task;
    });

    const total = await Task.countDocuments(query);

    res.json({
      tasks: tasksWithCleanedTags,
      pagination: {
        current: Number(page),
        total: Math.ceil(total / Number(limit)),
        count: tasks.length,
        totalItems: total,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.post("/bulk", async (req, res) => {
  try {
    const tasks = await Task.insertMany(req.body.tasks);
    res.status(201).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.put("/bulk", async (req, res) => {
  try {
    const { ids, update } = req.body;
    const result = await Task.updateMany(
      { _id: { $in: ids } },
      { $set: update }
    );
    res.json({
      message: "Bulk update completed",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.delete("/bulk", async (req, res) => {
  try {
    console.log("Bulk delete IDs:", req.body.ids);
    const { ids } = req.body;
    const result = await Task.deleteMany({ _id: { $in: ids } });
    res.json({
      message: "Bulk delete completed",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/stats/overview", async (req, res) => {
  try {
    const stats = await Task.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          completed: { $sum: { $cond: ["$completed", 1, 0] } },
          active: { $sum: { $cond: ["$completed", 0, 1] } },
        },
      },
    ]);

    const result = stats[0] || { total: 0, completed: 0, active: 0 };
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/stats/priority", async (req, res) => {
  try {
    const priorityStats = await Task.aggregate([
      {
        $group: {
          _id: "$priority",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    res.json(priorityStats);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/stats/recent", async (req, res) => {
  try {
    const days = Number(req.query.days) || 7;
    const dateThreshold = new Date();
    dateThreshold.setDate(dateThreshold.getDate() - days);

    const recentTasks = await Task.countDocuments({
      createdAt: { $gte: dateThreshold },
    });

    res.json({ count: recentTasks, days });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Special query routes - must come before /:id routes
router.get("/due-range", async (req, res) => {
  try {
    const { start, end } = req.query;

    if (!start || !end) {
      res.status(400).json({ message: "Start and end dates are required" });
      return;
    }

    const tasks = await Task.find({
      dueDate: {
        $gte: new Date(start as string),
        $lte: new Date(end as string),
      },
    }).sort({ dueDate: 1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/overdue", async (req, res) => {
  try {
    const now = new Date();
    const overdueTasks = await Task.find({
      dueDate: { $lt: now },
      completed: false,
    }).sort({ dueDate: 1 });

    res.json(overdueTasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Priority routes - must come before /:id routes
router.get("/priority/:level", async (req, res) => {
  try {
    const { level } = req.params;
    const tasks = await Task.find({ priority: level })
      .populate("category", "name")
      .populate("tags", "name color");

    const tasksWithCleanedTags = tasks.map((task) => {
      if (task.tags) {
        task.tags = task.tags.filter((tag) => tag !== null);
      }
      return task;
    });

    res.json(tasksWithCleanedTags);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Individual task routes - these should come after all specific routes
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("category", "name")
      .populate("tags", "name color");
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    if (task.tags) {
      task.tags = task.tags.filter((tag) => tag !== null);
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.post("/", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate("category", "name")
      .populate("tags", "name color");
    if (!updated) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    if (updated.tags) {
      updated.tags = updated.tags.filter((tag) => tag !== null);
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updated) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.put("/:id/complete", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { completed: true, completedAt: new Date() },
      { new: true }
    );
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.put("/:id/incomplete", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { completed: false, $unset: { completedAt: 1 } },
      { new: true }
    );
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.put("/:id/toggle", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      {
        completed: !task.completed,
        ...(task.completed
          ? { $unset: { completedAt: 1 } }
          : { completedAt: new Date() }),
      },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.post("/:id/duplicate", async (req, res) => {
  try {
    const originalTask = await Task.findById(req.params.id);
    if (!originalTask) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    const duplicatedTask = new Task({
      ...originalTask.toObject(),
      _id: undefined,
      title: `${originalTask.title} (Copy)`,
      completed: false,
      createdAt: new Date(),
      completedAt: undefined,
    });

    await duplicatedTask.save();
    res.status(201).json(duplicatedTask);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.post("/cleanup/orphaned-tags", async (req, res) => {
  try {
    const existingTagIds = await Tag.find({}, "_id").then((tags: any[]) =>
      tags.map((tag: any) => tag._id.toString())
    );

    const tasksWithTags = await Task.find({ tags: { $exists: true, $ne: [] } });

    let updatedTasksCount = 0;

    for (const task of tasksWithTags) {
      const validTags = task.tags.filter((tagId: any) =>
        existingTagIds.includes(tagId.toString())
      );

      if (validTags.length !== task.tags.length) {
        await Task.findByIdAndUpdate(task._id, { tags: validTags });
        updatedTasksCount++;
      }
    }

    res.json({
      message: "Orphaned tag references cleaned up",
      updatedTasks: updatedTasksCount,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
