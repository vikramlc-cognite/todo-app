import React, { useState, useEffect } from 'react';
import { Container, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import { Task } from './types/task';

const App = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [filter, setFilter] = useState<string>('all');
  const [newTask, setNewTask] = useState<Partial<Task>>({});
  const [editTask, setEditTask] = useState<Task | null>(null);

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
    };

    setTasks([...tasks, newTaskObject]);
    setNewTask({});
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleComplete = (id: string) => {
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

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        ToDo Application
      </Typography>

      <TaskForm task={newTask} setTask={setNewTask} onSubmit={handleAddTask} />
      <TaskFilter filter={filter} setFilter={setFilter} />
      <TaskList
        tasks={filteredTasks}
        onToggleComplete={handleToggleComplete}
        onDelete={handleDeleteTask}
        onEdit={setEditTask}
      />

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