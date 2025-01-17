import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
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

const SortableItem = ({
  task,
  onDelete,
  onEdit,
  onToggleComplete
}: SortableListProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: task.completed ? '#f0f0f0' : 'inherit',
    cursor: 'pointer',
  };

  return (
    <ListItem
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      divider
    >
      <Checkbox checked={task.completed} onMouseDown={() => {
        onToggleComplete(task.id);
      }} />
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

const TaskList = ({ tasks, onDelete, onEdit, onReorder, onToggleComplete }: TaskListProps) => {
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragEnd = ({ active, over }: { active: any; over: any }) => {
    if (!over) return;
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
              onToggleComplete={onToggleComplete}
            />
          ))}
        </List>
      </SortableContext>
    </DndContext>
  );
};

export default TaskList;
