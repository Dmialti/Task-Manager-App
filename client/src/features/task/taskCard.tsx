import React from "react";
import { Button, Card } from "../../components";
import type { Task } from "../../services";

interface TaskCardProps {
  task: Task;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
  onDuplicate: () => void;
  getPriorityColor: (priority: string) => string;
  getPriorityLabel: (priority: string) => string;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  onToggle,
  onDuplicate,
  getPriorityColor,
  getPriorityLabel,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("uk-UA", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isOverdue =
    task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  // useEffect(() => {
  //   console.log("TaskCard rendered for task:", task.tags);
  // }, [task.tags]);

  return (
    <Card className={`p-4 ${isSelected ? "ring-2 ring-blue-500" : ""}`}>
      <div className="flex items-start space-x-3">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {/* Title */}
              <h3
                className={`text-lg font-medium ${
                  task.completed
                    ? "line-through text-gray-500"
                    : "text-gray-900"
                }`}
              >
                {task.title}
              </h3>

              {/* Description */}
              {task.description && (
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {task.description}
                </p>
              )}

              {/* Meta information */}
              <div className="flex flex-wrap items-center gap-2 mt-2">
                {/* Priority */}
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
                    task.priority
                  )}`}
                >
                  {getPriorityLabel(task.priority)}
                </span>

                {/* Category */}
                {task.category && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {task.category.name}
                  </span>
                )}

                {/* Tags */}
                {task.tags && task.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {task.tags.map((tag) => (
                      <span
                        key={tag._id}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
                        style={{
                          backgroundColor: tag.color
                            ? `${tag.color}20`
                            : "#f3f4f6",
                          color: tag.color || "#374151",
                        }}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Due date */}
                {task.dueDate && (
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      isOverdue
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {isOverdue && (
                      <svg
                        className="w-3 h-3 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    {formatDate(task.dueDate)}
                  </span>
                )}
              </div>

              {/* Subtasks progress */}
              {task.subtasks && task.subtasks.length > 0 && (
                <div className="mt-2">
                  <div className="text-xs text-gray-500">
                    Підзавдання:{" "}
                    {task.subtasks.filter((st) => st.completed).length} /{" "}
                    {task.subtasks.length}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${
                          (task.subtasks.filter((st) => st.completed).length /
                            task.subtasks.length) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Created/Updated dates */}
              <div className="flex gap-4 mt-2 text-xs text-gray-400">
                {task.createdAt && (
                  <span>Створено: {formatDate(task.createdAt)}</span>
                )}
                {task.completedAt && (
                  <span>Завершено: {formatDate(task.completedAt)}</span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-1 ml-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                leftIcon={
                  task.completed ? (
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
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ) : (
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )
                }
              >
                {task.completed ? "Відмінити" : "Завершити"}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={onEdit}
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
                onClick={onDuplicate}
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
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                }
              >
                Дублювати
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={onDelete}
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
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
