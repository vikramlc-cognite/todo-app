import TextField from "@mui/material/TextField";

interface TaskSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const TaskSearch = ({
  searchQuery,
  setSearchQuery,
}: TaskSearchProps) => {
  return (
      <TextField
        fullWidth
        label="Search Tasks"
        margin="normal"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
  );
};

export default TaskSearch;
