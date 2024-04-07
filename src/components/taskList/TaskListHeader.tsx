import { Stack, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

interface Props {
  name: string;
}

function TaskListHeader({ name }: Props) {
  return (
    <>
      <header contentEditable>{name}</header>
      <div className="taskListToolbar">
        <Stack spacing={2} direction={"row"}>
          <Button variant="text">
            <ArrowBackIcon />
            Back
          </Button>

          <Stack spacing={0.5} direction={"row"}>
            <Button>
              Add Task (
              <KeyboardReturnIcon />)
            </Button>
            <Button>Import Task</Button>
          </Stack>
        </Stack>
        <Button
          color="error"
          style={{
            color: "aliceblue",
          }}
        >
          Delete List
        </Button>
      </div>
    </>
  );
}

export default TaskListHeader;
