import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
} from '@mui/material';
import { Task, TaskListProps } from '../types/task';



const TaskList = ({ tasks, onToggleComplete, onDelete, onEdit }: TaskListProps) => {
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
            secondary={`${task.description || 'No description'} - ${
              task.dueDate || 'No due date'
            }`}
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" onClick={() => onEdit(task)} />
            <IconButton edge="end" onClick={() => onDelete(task.id)} />
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;