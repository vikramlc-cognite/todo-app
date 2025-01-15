import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  Button,
} from "@mui/material";
import { TaskListProps } from "../types/task";

const TaskList = ({
  tasks,
  onToggleComplete,
  onDelete,
  onEdit,
}: TaskListProps) => {
  return (
    <List>
      {tasks.map((task) => (
        <ListItem key={task.id} divider>
          <Checkbox
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
          />
          <ListItemText
            primary={task.title}
            secondary={`${task.description || "No description"} - ${
              task.dueDate || "No due date"
            }`}
          />
          <ListItemSecondaryAction>
            <Button onClick={() => onEdit(task)}>Edit</Button>
            <Button onClick={() => onDelete(task.id)}>Delete</Button>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
