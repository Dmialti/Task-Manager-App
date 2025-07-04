import React, { useState, useEffect, useCallback } from "react";
import { Button, Card, Loader, Dropdown, Input } from "../components";
import { TaskService, CategoryService, TagService } from "../services";
import type { Task, TaskFilters, Category, Tag } from "../services";
import TaskCard from "../features/task/taskCard";
import CreateTaskFeature from "../features/task/createTask";
import EditTaskFeature from "../features/task/editTask";

const TaskManagerPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [filters, setFilters] = useState<TaskFilters>({
    page: 1,
    limit: 10,
    sort: "createdAt",
    order: "desc",
  });
  const [pagination, setPagination] = useState({
    current: 1,
    total: 1,
    count: 0,
    totalItems: 0,
  });

  const loadTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await TaskService.getAllTasks(filters);
      setTasks(response.tasks);
      setPagination(response.pagination);
    } catch (err) {
      console.error("Error loading tasks:", err);
      setError("Помилка при завантаженні завдань");
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  const loadCategories = async () => {
    try {
      const fetchedCategories = await CategoryService.getAllCategories();
      setCategories(fetchedCategories);
    } catch (err) {
      console.error("Error loading categories:", err);
    }
  };

  const loadTags = async () => {
    try {
      const fetchedTags = await TagService.getAllTags();
      setTags(fetchedTags);
    } catch (err) {
      console.error("Error loading tags:", err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await loadTasks();
      await loadCategories();
      await loadTags();
    };
    loadData();
  }, [loadTasks]);

  const handleTaskCreated = (newTask: Task) => {
    setTasks((prev) => [newTask, ...prev]);
    setShowCreateForm(false);
  };

  const handleTaskUpdated = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) => (task._id === updatedTask._id ? updatedTask : task))
    );
    setEditingTask(null);
  };

  const handleTaskDeleted = async (taskId: string) => {
    try {
      await TaskService.deleteTask(taskId);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (err) {
      console.error("Error deleting task:", err);
      setError("Помилка при видаленні завдання");
    }
  };

  const handleTaskToggle = async (taskId: string) => {
    try {
      const updatedTask = await TaskService.toggleTaskComplete(taskId);
      setTasks((prev) =>
        prev.map((task) => (task._id === taskId ? updatedTask : task))
      );
    } catch (err) {
      console.error("Error toggling task:", err);
      setError("Помилка при зміні статусу завдання");
    }
  };

  const handleTaskDuplicate = async (taskId: string) => {
    try {
      const duplicatedTask = await TaskService.duplicateTask(taskId);
      setTasks((prev) => [duplicatedTask, ...prev]);
    } catch (err) {
      console.error("Error duplicating task:", err);
      setError("Помилка при дублюванні завдання");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedTasks.length === 0) return;

    try {
      await TaskService.bulkDeleteTasks({ ids: selectedTasks });
      setTasks((prev) =>
        prev.filter((task) => !selectedTasks.includes(task._id))
      );
      setSelectedTasks([]);
    } catch (err) {
      console.error("Error bulk deleting tasks:", err);
      setError("Помилка при масовому видаленні завдань");
    }
  };

  const handleBulkComplete = async () => {
    if (selectedTasks.length === 0) return;

    try {
      await TaskService.bulkUpdateTasks({
        ids: selectedTasks,
        update: { completed: true },
      });
      // Перезавантажуємо завдання для отримання актуальних даних
      loadTasks();
      setSelectedTasks([]);
    } catch (err) {
      console.error("Error bulk completing tasks:", err);
      setError("Помилка при масовому завершенні завдань");
    }
  };

  const handleFilterChange = (newFilters: Partial<TaskFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleSelectTask = (taskId: string) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleSelectAll = () => {
    if (selectedTasks.length === tasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(tasks.map((task) => task._id));
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "Терміново";
      case "high":
        return "Високий";
      case "medium":
        return "Середній";
      case "low":
        return "Низький";
      default:
        return priority;
    }
  };

  if (showCreateForm) {
    return (
      <CreateTaskFeature
        onTaskCreated={handleTaskCreated}
        onBack={() => setShowCreateForm(false)}
        categories={categories}
        tags={tags}
      />
    );
  }

  if (editingTask) {
    return (
      <EditTaskFeature
        task={editingTask}
        onTaskUpdated={handleTaskUpdated}
        onBack={() => setEditingTask(null)}
        categories={categories}
        tags={tags}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Управління завданнями
        </h2>
        <Button
          variant="primary"
          onClick={() => setShowCreateForm(true)}
          leftIcon={
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          }
        >
          Створити завдання
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Фільтр:</label>
            <Dropdown
              options={[
                { value: "", label: "Всі завдання" },
                { value: "active", label: "Активні" },
                { value: "completed", label: "Завершені" },
              ]}
              value={filters.filter || ""}
              onChange={(value) =>
                handleFilterChange({
                  filter: value as "active" | "completed" | undefined,
                })
              }
            />
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">
              Сортування:
            </label>
            <Dropdown
              options={[
                { value: "createdAt", label: "Дата створення" },
                { value: "updatedAt", label: "Дата оновлення" },
                { value: "dueDate", label: "Дата виконання" },
                { value: "priority", label: "Пріоритет" },
                { value: "title", label: "Назва" },
              ]}
              value={filters.sort || "createdAt"}
              onChange={(value) =>
                handleFilterChange({
                  sort: value as
                    | "createdAt"
                    | "updatedAt"
                    | "dueDate"
                    | "priority"
                    | "title",
                })
              }
            />
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">
              Порядок:
            </label>
            <Dropdown
              options={[
                { value: "desc", label: "Спадання" },
                { value: "asc", label: "Зростання" },
              ]}
              value={filters.order || "desc"}
              onChange={(value) =>
                handleFilterChange({ order: value as "asc" | "desc" })
              }
            />
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Пошук:</label>
            <Input
              type="text"
              placeholder="Пошук завдань..."
              value={filters.search || ""}
              onChange={(e) => handleFilterChange({ search: e.target.value })}
            />
          </div>
        </div>
      </Card>

      {/* Bulk Actions */}
      {selectedTasks.length > 0 && (
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Обрано: {selectedTasks.length} завдань
            </span>
            <div className="flex space-x-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleBulkComplete}
              >
                Завершити всі
              </Button>
              <Button variant="danger" size="sm" onClick={handleBulkDelete}>
                Видалити всі
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <svg
              className="w-5 h-5 text-red-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <div className="ml-3">
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Tasks List */}
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader size="lg" />
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="text-gray-400 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Ще немає завдань
              </h3>
              <p className="text-gray-600 mb-4">
                Створіть своє перше завдання для початку роботи
              </p>
              <Button variant="primary" onClick={() => setShowCreateForm(true)}>
                Створити перше завдання
              </Button>
            </Card>
          ) : (
            <>
              {/* Select All */}
              <div className="flex items-center space-x-2 mb-4">
                <input
                  type="checkbox"
                  checked={selectedTasks.length === tasks.length}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label className="text-sm font-medium text-gray-700">
                  Вибрати всі завдання
                </label>
              </div>

              {/* Tasks Grid */}
              <div className="grid gap-4">
                {tasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    isSelected={selectedTasks.includes(task._id)}
                    onSelect={() => handleSelectTask(task._id)}
                    onEdit={() => setEditingTask(task)}
                    onDelete={() => handleTaskDeleted(task._id)}
                    onToggle={() => handleTaskToggle(task._id)}
                    onDuplicate={() => handleTaskDuplicate(task._id)}
                    getPriorityColor={getPriorityColor}
                    getPriorityLabel={getPriorityLabel}
                  />
                ))}
              </div>

              {/* Pagination */}
              {pagination.total > 1 && (
                <div className="flex justify-center space-x-2 mt-6">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handlePageChange(pagination.current - 1)}
                    disabled={pagination.current === 1}
                  >
                    Попередня
                  </Button>

                  {Array.from(
                    { length: pagination.total },
                    (_, i) => i + 1
                  ).map((page) => (
                    <Button
                      key={page}
                      variant={
                        page === pagination.current ? "primary" : "ghost"
                      }
                      size="sm"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  ))}

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handlePageChange(pagination.current + 1)}
                    disabled={pagination.current === pagination.total}
                  >
                    Наступна
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskManagerPage;
