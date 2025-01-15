import { TextField, Button, FormControl, Select, MenuItem } from '@mui/material';
import { TaskFormProps } from '../types/task';

const TaskForm = ({ task, setTask, onSubmit }: TaskFormProps) => {
  return (
    <>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Task Title"
          value={task.title || ''}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Task Description"
          value={task.description || ''}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          type="date"
          label="Due Date"
          InputLabelProps={{ shrink: true }}
          value={task.dueDate || ''}
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <Select
          value={task.priority || 'Medium'}
          onChange={(e) => setTask({ ...task, priority: e.target.value as 'High' | 'Medium' | 'Low' })}
        >
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={onSubmit}>
        Add Task
      </Button>
    </>
  );
};

export default TaskForm;  