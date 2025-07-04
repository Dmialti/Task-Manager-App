import React, { useState, useEffect } from "react";
import { Button, Card, Loader } from "../components";
import { CategoryService } from "../services";
import type { Category } from "../services";
import CreateCategoryFeature from "../features/category/createCategory";
import EditCategoryFeature from "../features/category/editCategory";

const CategoryManager: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setIsLoading(true);
      setError("");
      const fetchedCategories = await CategoryService.getAllCategories();
      setCategories(fetchedCategories);
    } catch (err) {
      console.error("Error loading categories:", err);
      setError("Помилка при завантаженні категорій");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryCreated = (newCategory: Category) => {
    setCategories((prev) => [...prev, newCategory]);
    setShowCreateForm(false);
  };

  const handleCategoryUpdated = (updatedCategory: Category) => {
    setCategories((prev) =>
      prev.map((category) =>
        category._id === updatedCategory._id ? updatedCategory : category
      )
    );
    setEditingCategory(null);
  };

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      console.log("Deleting category with ID:", categoryId);
      await CategoryService.deleteCategory(categoryId);
      setCategories((prev) =>
        prev.filter((category) => category._id !== categoryId)
      );
    } catch (err) {
      console.error("Error deleting category:", err);
      setError("Помилка при видаленні категорії");
    }
  };

  if (showCreateForm) {
    return (
      <CreateCategoryFeature
        onCategoryCreated={handleCategoryCreated}
        onBack={() => setShowCreateForm(false)}
      />
    );
  }

  if (editingCategory) {
    return (
      <EditCategoryFeature
        category={editingCategory}
        onCategoryUpdated={handleCategoryUpdated}
        onBack={() => setEditingCategory(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Управління категоріями
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
          Створити категорію
        </Button>
      </div>

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

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader size="lg" />
        </div>
      ) : (
        <div className="grid gap-4">
          {categories.length === 0 ? (
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
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Ще немає категорій
              </h3>
              <p className="text-gray-600 mb-4">
                Створіть свою першу категорію для організації завдань
              </p>
              <Button variant="primary" onClick={() => setShowCreateForm(true)}>
                Створити першу категорію
              </Button>
            </Card>
          ) : (
            <div className="grid gap-3">
              {categories.map((category) => (
                <Card key={category._id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="inline-flex items-center px-0 py-1 rounded-full text-lg font-medium text-black ">
                        {category.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingCategory(category)}
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
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        }
                      >
                        Редагувати
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteCategory(category._id)}
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
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        }
                      >
                        Видалити
                      </Button>
                    </div>
                  </div>

                  {category.createdAt && (
                    <div className="mt-2 text-xs text-gray-400">
                      Створено:{" "}
                      {new Date(category.createdAt).toLocaleDateString("uk-UA")}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryManager;
