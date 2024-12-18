import { useState } from "react";

export default function TaskList({
  tasks,
  isCheck,
  onCheckChange,
  onDeleteTask,
  onEditTask,
}) {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState("");
  const [error, setError] = useState("");

  const handleEdit = (task) => {
    setEditingTaskId(task.ID);
    setEditedTask(task.task);
    setError("");
  };

  const handleSaveEdit = (taskId) => {
    if (editedTask.trim().length < 6) {
      setError("Task must be at least 6 characters long.");
      return;
    }
    if (editedTask.length > 60) {
      setError("Task cannot exceed 60 characters.");
      return;
    }

    onEditTask(taskId, editedTask);
    setEditingTaskId(null);
    setEditedTask("");
    setError("");
  };

  return (
    <div className="mt-4 h-[500px] no-scrollbar overflow-y-auto ">
      <ul className="divide-y divide-gray-200">
        {tasks.map((task) => (
          <li
            key={task.ID}
            className="flex items-center justify-between py-3 px-4"
          >
            <div className="flex items-center gap-3 flex-1">
              {/* Checkbox */}
              <input
                type="checkbox"
                className="w-5 h-5 rounded text-blue-500 border-gray-300 focus:ring-2 focus:ring-blue-400"
                checked={isCheck[task.ID]}
                onChange={() => onCheckChange(task.ID)}
              />

              {/* Editable Task Text */}
              {editingTaskId === task.ID ? (
                <div className="flex">
                  <textarea
                    className={`w-full p-2 border ${
                      error ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring focus:ring-blue-400`}
                    value={editedTask}
                    onChange={(e) => setEditedTask(e.target.value)}
                  />
                  <button
                    className="ml-2 bg-none text-blue-600 rounded-lg text-xl hover:text-blue-800 transition duration-200"
                    onClick={() => handleSaveEdit(task.ID)}
                  >
                    <span className="material-icons">check</span>
                  </button>
                  {error && (
                    <div className="text-red-500 text-xs mt-1 animate-pulse">
                      {error}
                    </div>
                  )}
                </div>
              ) : (
                <span
                  className={`flex-1 text-sm ${
                    isCheck[task.ID]
                      ? "line-through text-gray-400"
                      : "text-gray-700"
                  }`}
                >
                  {task.task}
                </span>
              )}
            </div>

            {/* Action Buttons */}
            {editingTaskId !== task.ID && (
              <div className="flex gap-2">
                <button
                  className="text-blue-500  hover:text-blue-600 transition duration-200 text-sm"
                  onClick={() => handleEdit(task)}
                >
                  <span className="material-icons text-[22px]">edit</span>
                </button>
                <button
                  className="text-red-500 hover:text-red-800 transition duration-200 text-sm"
                  onClick={() => onDeleteTask(task.ID)}
                >
                  <span className="material-icons text-[22px]">remove</span>
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
