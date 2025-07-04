import React, { useState } from "react";
import { Button, Card, Input, Dropdown } from "../../components";
import { TaskService } from "../../services";
import type { Task, CreateTaskRequest, Category, Tag } from "../../services";

interface CreateTaskFeatureProps {
  onTaskCreated: (task: Task) => void;
  onBack: () => void;
  categories: Category[];
  tags: Tag[];
}

const CreateTaskFeature: React.FC<CreateTaskFeatureProps> = ({
  onTaskCreated,
  onBack,
  categories,
  tags,
}) => {
  const [formData, setFormData] = useState<CreateTaskRequest>({
    title: "",
    description: "",
    priority: "medium",
    category: "",
    tags: [],
    dueDate: "",
    subtasks: [],
    notes: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [newSubtask, setNewSubtask] = useState("");
  const [newNote, setNewNote] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError("Назва завдання обов'язкова");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const taskData: CreateTaskRequest = {
        ...formData,
        category: formData.category || undefined,
        tags: formData.tags?.length ? formData.tags : undefined,
        dueDate: formData.dueDate || undefined,
        subtasks: formData.subtasks?.length ? formData.subtasks : undefined,
        notes: formData.notes?.length ? formData.notes : undefined,
      };

      const newTask = await TaskService.createTask(taskData);
      onTaskCreated(newTask);
    } catch (err) {
      console.error("Error creating task:", err);
      setError("Помилка при створенні завдання");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDropdownChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagToggle = (tagId: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags?.includes(tagId)
        ? prev.tags.filter((id) => id !== tagId)
        : [...(prev.tags || []), tagId],
    }));
  };

  const handleAddSubtask = () => {
    if (newSubtask.trim()) {
      setFormData((prev) => ({
        ...prev,
        subtasks: [
          ...(prev.subtasks || []),
          { title: newSubtask.trim(), completed: false },
        ],
      }));
      setNewSubtask("");
    }
  };

  const handleRemoveSubtask = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      subtasks: prev.subtasks?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      setFormData((prev) => ({
        ...prev,
        notes: [...(prev.notes || []), { content: newNote.trim() }],
      }));
      setNewNote("");
    }
  };

  const handleRemoveNote = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      notes: prev.notes?.filter((_, i) => i !== index) || [],
    }));
  };

  const priorityOptions = [
    { value: "low", label: "Низький" },
    { value: "medium", label: "Середній" },
    { value: "high", label: "Високий" },
    { value: "urgent", label: "Терміново" },
  ];

  const categoryOptions = [
    { value: "", label: "Без категорії" },
    ...categories.map((cat) => ({ value: cat._id, label: cat.name })),
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Button
          variant="ghost"
          onClick={onBack}
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          }
        >
          Назад
        </Button>
        <h2 className="text-2xl font-bold text-gray-900">Створити завдання</h2>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Назва завдання *
              </label>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Введіть назву завдання..."
                required
              />
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Опис
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Введіть опис завдання..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Пріоритет
              </label>
              <Dropdown
                options={priorityOptions}
                value={formData.priority}
                onChange={(value) => handleDropdownChange("priority", value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Категорія
              </label>
              <Dropdown
                options={categoryOptions}
                value={formData.category}
                onChange={(value) => handleDropdownChange("category", value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Дата виконання
              </label>
              <Input
                type="datetime-local"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Теги
            </label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag._id}
                  type="button"
                  onClick={() => handleTagToggle(tag._id)}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
                    formData.tags?.includes(tag._id)
                      ? "bg-blue-100 text-blue-800 border-blue-300"
                      : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
                  }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Підзавдання
            </label>
            <div className="space-y-2">
              {formData.subtasks?.map((subtask, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="flex-1 text-sm text-gray-700">
                    {subtask.title}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveSubtask(index)}
                  >
                    Видалити
                  </Button>
                </div>
              ))}
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="text"
                  placeholder="Додати підзавдання..."
                  value={newSubtask}
                  onChange={(e) => setNewSubtask(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddSubtask();
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleAddSubtask}
                  className="w-full sm:w-auto"
                >
                  Додати
                </Button>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Нотатки
            </label>
            <div className="space-y-2">
              {formData.notes?.map((note, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="flex-1 text-sm text-gray-700">
                    {note.content}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveNote(index)}
                  >
                    Видалити
                  </Button>
                </div>
              ))}
              <div className="flex flex-col sm:flex-row gap-2">
                <textarea
                  placeholder="Додати нотатку..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  rows={2}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleAddNote}
                  className="w-full sm:w-auto"
                >
                  Додати
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
            <Button
              variant="secondary"
              onClick={onBack}
              disabled={isLoading}
              fullWidth={true}
              className="sm:w-auto"
            >
              Скасувати
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              disabled={!formData.title.trim()}
              fullWidth={true}
              className="sm:w-auto"
            >
              Створити завдання
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateTaskFeature;
