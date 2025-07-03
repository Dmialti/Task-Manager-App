import React, { useState } from "react";
import { Button, Card, Input } from "../components";
import { TagService } from "../services/tagService";
import type { Tag, UpdateTagRequest } from "../services/types";

interface EditTagPageProps {
  tag: Tag;
  onTagUpdated: (updatedTag: Tag) => void;
  onBack: () => void;
}

const predefinedColors = [
  "#EF4444",
  "#F97316",
  "#F59E0B",
  "#EAB308",
  "#84CC16",
  "#22C55E",
  "#10B981",
  "#06B6D4",
  "#3B82F6",
  "#6366F1",
  "#8B5CF6",
  "#A855F7",
  "#EC4899",
  "#F43F5E",
];

const EditTagPage: React.FC<EditTagPageProps> = ({
  tag,
  onTagUpdated,
  onBack,
}) => {
  const [formData, setFormData] = useState<UpdateTagRequest>({
    name: tag.name,
    color: tag.color,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name?.trim()) {
      setError("Назва тегу обов'язкова");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const updatedTag = await TagService.updateTag(tag._id, formData);
      onTagUpdated(updatedTag);
    } catch (err) {
      console.error("Error updating tag:", err);
      setError("Помилка при оновленні тегу");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleColorSelect = (color: string) => {
    setFormData((prev) => ({ ...prev, color }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
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
        <h2 className="text-2xl font-bold text-gray-900">Редагувати тег</h2>
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Назва тегу
            </label>
            <Input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleInputChange}
              placeholder="Введіть назву тегу..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Колір тегу
            </label>
            <div className="space-y-4">
              <div className="grid grid-cols-7 gap-2">
                {predefinedColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleColorSelect(color)}
                    className={`w-10 h-10 rounded-lg border-2 transition-all duration-200 ${
                      formData.color === color
                        ? "border-gray-900 scale-110"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Або введіть власний колір (HEX)
                </label>
                <Input
                  type="text"
                  name="color"
                  value={formData.color || ""}
                  onChange={handleInputChange}
                  placeholder="#000000"
                  pattern="^#[0-9A-Fa-f]{6}$"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Попередній перегляд
            </label>
            <div className="flex items-center space-x-3">
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: formData.color || "#6B7280" }}
              >
                {formData.name || "Назва тегу"}
              </span>
              <span className="text-sm text-gray-500">
                {formData.color || "#6B7280"}
              </span>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="secondary" onClick={onBack} disabled={isLoading}>
              Скасувати
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              disabled={!formData.name?.trim()}
            >
              Зберегти зміни
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EditTagPage;
