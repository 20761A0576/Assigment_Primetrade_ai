// src/components/TaskList.jsx
import TaskItem from './TaskItem';

export default function TaskList({ tasks, isLoading, onDeleteTask, onUpdateTask }) {
  if (isLoading) {
    return <p className="text-center text-gray-500">Loading tasks...</p>;
  }

  if (tasks.length === 0) {
    return <p className="text-center text-gray-500">No tasks yet. Add one above to get started!</p>;
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={() => onDeleteTask(task.id)}
          onUpdate={() => onUpdateTask(task.id, task.done)}
        />
      ))}
    </ul>
  );
}