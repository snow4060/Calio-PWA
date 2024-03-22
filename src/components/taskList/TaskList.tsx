import { Button, Stack } from "@mui/material";
import { TaskWithTaskList } from "../context/TaskContext";

interface Props {
  name: string;
  tasks: TaskWithTaskList[];
}

function TaskList({ name, tasks }: Props) {
  return (
    <div className="taskList rightPanel">
      <header contentEditable>{name}</header>
      <div className="taskListToolbar">
        <Stack spacing={2} direction={"row"}>
          <Button>
            <svg width="20px" height="20px">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
            </svg>
            Back
          </Button>

          <Stack spacing={0.5} direction={"row"}>
            <Button>
              Add Task (
              <svg width="21px" height="20px">
                <path d="M19 7v4H5.83l3.58-3.59L8 6l-6 6 6 6 1.41-1.41L5.83 13H21V7z"></path>
              </svg>
              )
            </Button>
            <Button>Import Task</Button>
          </Stack>
        </Stack>
        <Button color="error">Delete List</Button>
      </div>
    </div>
  );
}

export default TaskList;
