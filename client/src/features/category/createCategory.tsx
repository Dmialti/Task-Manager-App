import React, { useState } from "react";
import { Button, Card, Input } from "../../components";
import { CategoryService } from "../../services";
import type { Category, CreateCategoryRequest } from "../../services";

interface CreateCategoryFeatureProps {
  onCategoryCreated: (category: Category) => void;
  onBack: () => void;
}

const CreateCategoryFeature: React.FC<CreateCategoryFeatureProps> = ({
  onCategoryCreated,
  onBack,
}) => {
  const [formData, setFormData] = useState<CreateCategoryRequest>({
    name: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("Назва категорії обов'язкова");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const newCategory = await CategoryService.createCategory(formData);
      onCategoryCreated(newCategory);
    } catch (err) {
      console.error("Error creating category:", err);
      setError("Помилка при створенні категорії");
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
        <h2 className="text-2xl font-bold text-gray-900">Створити категорію</h2>
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
              Назва категорії
            </label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Введіть назву категорії..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Попередній перегляд
            </label>
            <div className="flex items-center space-x-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white">
                {formData.name || "Назва категорії"}
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
              disabled={!formData.name.trim()}
            >
              Створити категорію
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateCategoryFeature;
