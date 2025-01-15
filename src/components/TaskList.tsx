import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
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
  onToggleComplete,
  onDelete,
  onEdit,
}: SortableListProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <ListItem
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      divider
      onChange={() => onToggleComplete(task.id)}
    >
      <Checkbox
        checked={task.completed}
        onSelect={() => {
          console.log("onSelect");
          onToggleComplete(task.id);
        }}
        // onMouseEnter={() => onToggleComplete(task.id)}
        // onMouseLeave={() => onToggleComplete(task.id)}
        onChange={() => onToggleComplete(task.id)}
      />
      <ListItemText
        primary={task.title}
        secondary={`${task.description || "No description"} - ${
          task.dueDate || "No due date"
        } - Priority: ${task.priority}`}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" onClick={() => onEdit(task)}></IconButton>
        <IconButton edge="end" onClick={() => onDelete(task.id)}></IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleComplete,
  onDelete,
  onEdit,
  onReorder,
}) => {
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragEnd = ({ active, over }: { active: any; over: any }) => {
    if (active.id !== over.id) {
      const oldIndex = tasks.findIndex((task) => task.id === active.id);
      const newIndex = tasks.findIndex((task) => task.id === over.id);
      const newOrder = arrayMove(tasks, oldIndex, newIndex);
      onReorder(newOrder);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <List>
          {tasks.map((task) => (
            <SortableItem
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </List>
      </SortableContext>
    </DndContext>
  );
};

export default TaskList;
