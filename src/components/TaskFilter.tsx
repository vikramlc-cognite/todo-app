import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { TaskFilterProps } from '../types/task';

const TaskFilter = ({ filter, setFilter }: TaskFilterProps) => {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>Filter Tasks</InputLabel>
      <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="completed">Completed</MenuItem>
        <MenuItem value="pending">Pending</MenuItem>
      </Select>
    </FormControl>
  );
};

export default TaskFilter;