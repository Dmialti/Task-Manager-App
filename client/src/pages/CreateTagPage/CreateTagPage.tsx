import React, { useState } from "react";
import { Button, Input, Card } from "../../components";
import { TagService } from "../../services/tagService";
import type { CreateTagRequest, Tag } from "../../services/types";

interface CreateTagPageProps {
  onTagCreated?: (tag: Tag) => void;
  onBack?: () => void;
}

const CreateTagPage: React.FC<CreateTagPageProps> = ({
  onTagCreated,
  onBack,
}) => {
  const [formData, setFormData] = useState<CreateTagRequest>({
    name: "",
    color: "#3B82F6",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError("Назва тегу є обов'язковою");
      return false;
    }
    if (formData.name.trim().length < 2) {
      setError("Назва тегу повинна містити принаймні 2 символи");
      return false;
    }
    if (formData.name.trim().length > 50) {
      setError("Назва тегу не може містити більше 50 символів");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const createdTag = await TagService.createTag({
        name: formData.name.trim(),
        color: formData.color,
      });

      setSuccess("Тег успішно створено!");
      setFormData({ name: "", color: "#3B82F6" });

      if (onTagCreated) {
        onTagCreated(createdTag);
      }
    } catch (err: unknown) {
      console.error("Error creating tag:", err);
      let errorMessage = "Помилка при створенні тегу. Спробуйте ще раз.";

      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "object" && err !== null && "response" in err) {
        const responseError = err as {
          response?: { data?: { message?: string } };
        };
        errorMessage = responseError.response?.data?.message || errorMessage;
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const predefinedColors = [
    "#3B82F6",
    "#EF4444",
    "#10B981",
    "#F59E0B",
    "#8B5CF6",
    "#F97316",
    "#06B6D4",
    "#84CC16",
    "#EC4899",
    "#6B7280",
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-md px-4">
        <div className="mb-6">
          {onBack && (
            <Button
              variant="ghost"
              size="sm"
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              }
            >
              Назад
            </Button>
          )}
        </div>

        <Card className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Створити новий тег
            </h1>
            <p className="text-gray-600">
              Додайте новий тег для організації ваших завдань
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                label="Назва тегу"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Введіть назву тегу"
                error={error}
                success={success}
                disabled={isLoading}
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Колір тегу
              </label>

              <div className="mb-4">
                <input
                  type="color"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  className="w-full h-12 rounded-lg border border-gray-300 cursor-pointer"
                  disabled={isLoading}
                />
              </div>

              <div className="grid grid-cols-5 gap-2">
                {predefinedColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      formData.color === color
                        ? "border-gray-900 scale-110"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setFormData((prev) => ({ ...prev, color }))}
                    disabled={isLoading}
                    title={color}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Попередній перегляд
              </label>
              <div className="flex items-center space-x-2">
                <span
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: formData.color }}
                >
                  {formData.name || "Назва тегу"}
                </span>
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isLoading}
                disabled={!formData.name.trim() || isLoading}
              >
                {isLoading ? "Створення..." : "Створити тег"}
              </Button>

              {onBack && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onBack}
                  disabled={isLoading}
                >
                  Скасувати
                </Button>
              )}
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CreateTagPage;
