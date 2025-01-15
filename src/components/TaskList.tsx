import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Button,
} from "@mui/material";
import { SortableListProps, TaskListProps } from "../types/task";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

const SortableItem = ({
  task,
  isSelected,
  onDelete,
  onEdit,
  toggleSelection
}: SortableListProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: isSelected ? '#f0f0f0' : 'inherit',
    cursor: 'pointer',
  };

  return (
    <ListItem
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      divider
      onClick={() => toggleSelection(task.id)}
    >
      <ListItemText
        primary={task.title}
        secondary={`${task.description || 'No description'} - ${
          task.dueDate || 'No due date'
        } - Priority: ${task.priority}`}
      />
      <ListItemSecondaryAction>
        <Button onClick={() => onEdit(task)}>Edit</Button>
        <Button onClick={() => onDelete(task.id)}>Delete</Button>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const TaskList = ({ tasks, onDelete, onEdit, onReorder }: TaskListProps) => {
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const toggleSelection = (id: string) => {
    setSelectedTasks((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((taskId) => taskId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDragEnd = ({ active, over }: { active: any; over: any }) => {
    if (active.id !== over.id) {
      const oldIndex = tasks.findIndex((task) => task.id === active.id);
      const newIndex = tasks.findIndex((task) => task.id === over.id);
      const newOrder = arrayMove(tasks, oldIndex, newIndex);
      onReorder(newOrder);
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
        <List>
          {tasks.map((task) => (
            <SortableItem
              key={task.id}
              task={task}
              onDelete={onDelete}
              onEdit={onEdit}
              isSelected={selectedTasks.includes(task.id)}
              toggleSelection={toggleSelection}
            />
          ))}
        </List>
      </SortableContext>
    </DndContext>
  );
};

export default TaskList;
