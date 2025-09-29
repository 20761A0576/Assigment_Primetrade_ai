// src/components/TaskItem.jsx
import { FaTrash } from 'react-icons/fa';

export default function TaskItem({ task, onDelete, onUpdate }) {
  return (
    <li
      className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
        task.done ? 'bg-gray-200 text-gray-500' : 'bg-white hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.done}
          onChange={onUpdate}
          className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
        />
        <span className={`text-lg ${task.done ? 'line-through' : ''}`}>
          {task.title}
        </span>
      </div>
      <button
        onClick={onDelete}
        className="text-gray-400 hover:text-red-500 transition-colors"
        aria-label="Delete task"
      >
        <FaTrash />
      </button>
    </li>
  );
}