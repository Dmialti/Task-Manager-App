import React, { useState, useEffect } from "react";
import { Button, Card, Loader } from "../components";
import { TagService } from "../services/tagService";
import type { Tag } from "../services/types";
import CreateTagPage from "../pages/CreateTagPage/CreateTagPage";

const TagManager: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    loadTags();
    console.log("TagManager mounted");
  }, []);

  const loadTags = async () => {
    try {
      setIsLoading(true);
      setError("");
      const fetchedTags = await TagService.getAllTags();
      setTags(fetchedTags);
    } catch (err) {
      console.error("Error loading tags:", err);
      setError("Помилка при завантаженні тегів");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTagCreated = (newTag: Tag) => {
    setTags((prev) => [...prev, newTag]);
    setShowCreateForm(false);
  };

  const handleDeleteTag = async (tagId: string) => {
    try {
      console.log("Deleting tag with ID:", tagId);
      await TagService.deleteTag(tagId);
      setTags((prev) => prev.filter((tag) => tag._id !== tagId));
    } catch (err) {
      console.error("Error deleting tag:", err);
      setError("Помилка при видаленні тегу");
    }
  };

  if (showCreateForm) {
    return (
      <CreateTagPage
        onTagCreated={handleTagCreated}
        onBack={() => setShowCreateForm(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Управління тегами</h2>
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
          Створити тег
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
          {tags.length === 0 ? (
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
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Ще немає тегів
              </h3>
              <p className="text-gray-600 mb-4">
                Створіть свій перший тег для організації завдань
              </p>
              <Button variant="primary" onClick={() => setShowCreateForm(true)}>
                Створити перший тег
              </Button>
            </Card>
          ) : (
            <div className="grid gap-3">
              {tags.map((tag) => (
                <Card key={tag._id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white"
                        style={{ backgroundColor: tag.color }}
                      >
                        {tag.name}
                      </span>
                      <div className="text-sm text-gray-500">{tag.color}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteTag(tag._id)}
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

                  {tag.createdAt && (
                    <div className="mt-2 text-xs text-gray-400">
                      Створено:{" "}
                      {new Date(tag.createdAt).toLocaleDateString("uk-UA")}
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

export default TagManager;
