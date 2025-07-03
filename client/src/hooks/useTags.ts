import { useState, useEffect } from "react";
import { TagService } from "../services";
import type { Tag, CreateTagRequest, UpdateTagRequest } from "../services";

export const useTags = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTags = async () => {
    try {
      setLoading(true);
      setError(null);
      const tagsData = await TagService.getAllTags();
      setTags(tagsData);
    } catch (err) {
      setError("Error loading tags");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createTag = async (tagData: CreateTagRequest): Promise<Tag | null> => {
    try {
      setLoading(true);
      setError(null);
      const newTag = await TagService.createTag(tagData);
      setTags((prevTags) => [...prevTags, newTag]);
      return newTag;
    } catch (err) {
      setError("Error creating tag");
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateTag = async (
    id: string,
    tagData: UpdateTagRequest
  ): Promise<Tag | null> => {
    try {
      setLoading(true);
      setError(null);
      const updatedTag = await TagService.updateTag(id, tagData);
      setTags((prevTags) =>
        prevTags.map((tag) => (tag._id === id ? updatedTag : tag))
      );
      return updatedTag;
    } catch (err) {
      setError("Error updating tag");
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteTag = async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await TagService.deleteTag(id);
      setTags((prevTags) => prevTags.filter((tag) => tag._id !== id));
      return true;
    } catch (err) {
      setError("Error deleting tag");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTags();
  }, []);

  return {
    tags,
    loading,
    error,
    loadTags,
    createTag,
    updateTag,
    deleteTag,
    setError,
  };
};
