export type Task = {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  completed: boolean;
}

export type TaskFormProps = {
  task: Partial<Task>;
  setTask: (task: Partial<Task>) => void;
  onSubmit: () => void;
}

export type TaskFilterProps = {
    filter: string;
    setFilter: (filter: string) => void;
  }

export type TaskListProps = {
    tasks: Task[];
    onToggleComplete: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (task: Task) => void;
  }