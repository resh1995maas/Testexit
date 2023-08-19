import React, { useState, useEffect } from 'react';
import axios from 'axios';

app.use(express.static(path.join(__dirname, "/build")));


const API_BASE_URL = 'http://localhost:5000/fetch-posts'; 

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/todos`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTask = async (taskText, status) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/todos`, {
        title: taskText,
        completed: status === 'completed',
      });
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_BASE_URL}/todos/${taskId}`);
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleToggleComplete = async (taskId, completed) => {
    try {
      await axios.put(`${API_BASE_URL}/todos/${taskId}`, { completed });
      const updatedTasks = tasks.map(task => {
        if (task.id === taskId) {
          return { ...task, completed };
        }
        return task;
      });
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') {
      return task.completed;
    }
    if (filter === 'incomplete') {
      return !task.completed;
    }
    return true;
  });

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <button onClick={() => setFilter('all')}>All Tasks</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('incomplete')}>Incomplete</button>
      </div>
      <div>
        <h2>Add Task</h2>
        <TaskForm onAddTask={handleAddTask} />
      </div>
      <div>
        <h2>Tasks</h2>
        <ul>
          {filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={() => handleDeleteTask(task.id)}
              onToggleComplete={(completed) =>
                handleToggleComplete(task.id, completed)
              }
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

const TaskForm = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState('');
  const [taskStatus, setTaskStatus] = useState('ongoing');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim() !== '') {
      onAddTask(taskText, taskStatus);
      setTaskText('');
      setTaskStatus('ongoing');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Enter task description"
      />
      <select value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)}>
        <option value="ongoing">Ongoing</option>
        <option value="completed">Completed</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
};

const TaskItem = ({ task, onDelete, onToggleComplete }) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={(e) => onToggleComplete(e.target.checked)}
      />
      <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.title}
      </span>
      <button onClick={onDelete}>Delete</button>
    </li>
  );
};

export default App;
