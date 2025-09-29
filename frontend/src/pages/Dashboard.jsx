// src/pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiLogOut } from 'react-icons/fi';

// Child components for a cleaner structure
import AddTaskForm from '../components/AddTaskForm';
import TaskList from '../components/TaskList';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch tasks from the server
  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const res = await API.get('/tasks');
      // Sort tasks to show incomplete ones first
      const sortedTasks = res.data.sort((a, b) => a.done - b.done);
      setTasks(sortedTasks);
    } catch (err) {
      toast.error('Failed to fetch tasks.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Function to create a new task
  const createTask = async (title) => {
    if (!title.trim()) {
      toast.error('Task title cannot be empty.');
      return;
    }
    try {
      await API.post('/tasks', { title });
      toast.success('Task added successfully!');
      fetchTasks(); // Refresh list after adding
    } catch (err) {
      toast.error('Failed to add task.');
    }
  };

  // Function to delete a task
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      toast.success('Task deleted!');
      setTasks(tasks.filter(task => task.id !== id)); // Optimistic UI update
    } catch (err) {
      toast.error('Failed to delete task.');
    }
  };

  // Function to toggle task completion status
  const updateTask = async (id, currentStatus) => {
    try {
      await API.put(`/tasks/${id}`, { done: !currentStatus });
      fetchTasks(); // Refresh to show updated status and re-sort
    } catch (err) {
      toast.error('Failed to update task.');
    }
  };


  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-md">
        <div className="container mx-auto max-w-4xl px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">My Tasks</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </header>
      
      <main className="container mx-auto max-w-4xl p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Add a New Task</h2>
            <AddTaskForm onAddTask={createTask} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
             <h2 className="text-xl font-semibold mb-4 text-gray-700">Your Task List</h2>
            <TaskList
                tasks={tasks}
                isLoading={isLoading}
                onDeleteTask={deleteTask}
                onUpdateTask={updateTask}
            />
        </div>
      </main>
    </div>
  );
}