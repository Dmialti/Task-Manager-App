import React from "react";
import { Card, Dropdown, Input } from "../../components";
import type { TaskFilters } from "../../services";

interface TaskFiltersProps {
  filters: TaskFilters;
  onFilterChange: (newFilters: Partial<TaskFilters>) => void;
}

const TaskFiltersFeature: React.FC<TaskFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  return (
    <Card className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-700">Фільтр:</label>
          <Dropdown
            options={[
              { value: "", label: "Всі завдання" },
              { value: "active", label: "Активні" },
              { value: "completed", label: "Завершені" },
            ]}
            value={filters.filter || ""}
            onChange={(value) =>
              onFilterChange({
                filter: value as "active" | "completed" | undefined,
              })
            }
          />
        </div>

        <div className="flex flex-col space-y-2">
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
              onFilterChange({
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

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-700">Порядок:</label>
          <Dropdown
            options={[
              { value: "desc", label: "Спадання" },
              { value: "asc", label: "Зростання" },
            ]}
            value={filters.order || "desc"}
            onChange={(value) =>
              onFilterChange({ order: value as "asc" | "desc" })
            }
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-700">Пошук:</label>
          <Input
            type="text"
            placeholder="Пошук завдань..."
            value={filters.search || ""}
            onChange={(e) => onFilterChange({ search: e.target.value })}
          />
        </div>
      </div>
    </Card>
  );
};

export default TaskFiltersFeature;
