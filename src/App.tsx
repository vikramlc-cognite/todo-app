import React, { useState, useEffect } from 'react';
import { Container, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem, Select } from '@mui/material';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import { Task } from './types/task';
import TaskSearch from './components/TaskSearch';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [filter, setFilter] = useState<string>('all');
  const [newTask, setNewTask] = useState<Partial<Task>>({});
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (!newTask.title) return alert('Task title is required');

    const newTaskObject: Task = {
      id: Date.now().toString(),
      title: newTask.title!,
      description: newTask.description || '',
      dueDate: newTask.dueDate || '',
      completed: false,
      priority: newTask.priority || 'Medium',
    };

    setTasks([...tasks, newTaskObject]);
    setNewTask({});
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleComplete = (id: string) => {
    console.log('Toggling task with id:', id);
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEditTask = () => {
    if (editTask) {
      setTasks(
        tasks.map((task) => (task.id === editTask.id ? editTask : task))
      );
      setEditTask(null);
    }
  };

  const handleReorder = (newOrder: Task[]) => {
    setTasks(newOrder);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const searchedTasks = filteredTasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Task Manager
      </Typography>

      <TaskForm task={newTask} setTask={setNewTask} onSubmit={handleAddTask} />
      <TaskFilter filter={filter} setFilter={setFilter} />
      <TaskSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <TaskList
        tasks={searchedTasks}
        onToggleComplete={handleToggleComplete}
        onDelete={(id) => setConfirmDelete(tasks.find((task) => task.id === id) || null)}
        onEdit={setEditTask}
        onReorder={handleReorder}
      />

      {confirmDelete && (
        <Dialog open={!!confirmDelete} onClose={() => setConfirmDelete(null)}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this task?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmDelete(null)}>Cancel</Button>
            <Button
              onClick={() => {
                handleDeleteTask(confirmDelete.id);
                setConfirmDelete(null);
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {editTask && (
        <Dialog open={!!editTask} onClose={() => setEditTask(null)}>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Task Title"
              margin="normal"
              value={editTask.title}
              onChange={(e) =>
                setEditTask({ ...editTask, title: e.target.value })
              }
            />
            <TextField
              fullWidth
              label="Task Description"
              margin="normal"
              value={editTask.description}
              onChange={(e) =>
                setEditTask({ ...editTask, description: e.target.value })
              }
            />
            <TextField
              fullWidth
              type="date"
              margin="normal"
              label="Due Date"
              InputLabelProps={{ shrink: true }}
              value={editTask.dueDate || ''}
              onChange={(e) =>
                setEditTask({ ...editTask, dueDate: e.target.value })
              }
            />
            <Select
              fullWidth
              value={editTask.priority || 'Medium'}
              onChange={(e) =>
                setEditTask({ ...editTask, priority: e.target.value as 'High' | 'Medium' | 'Low' })
              }
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditTask(null)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleEditTask} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default App;