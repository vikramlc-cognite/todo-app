import { TextField, Button, FormControl } from '@mui/material';
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
      <Button variant="contained" color="primary" onClick={onSubmit}>
        Add Task
      </Button>
    </>
  );
};

export default TaskForm;  