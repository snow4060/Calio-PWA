import { Stack, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import TaskLists from "./TaskLists";
import useTabContext from "../hooks/useTabContext";
import useTaskContext from "../hooks/useTaskContext";
import { useEffect } from "react";

interface Props {
  id: string;
}

function TaskListHeader({ id }: Props) {
  const { setTab } = useTabContext();
  const { taskArray } = useTaskContext();

  let name = "";
  taskArray.taskArray.array.forEach((task) => {
    const index = task.taskList?.findIndex(
      (taskListInstance) => taskListInstance.taskListId === id
    );
    if (index !== -1 && index !== undefined) {
      name = task.taskList![index].taskListName;
    }
  });

  const handleClickBack = () => {
    setTab(<TaskLists />);
  };

  const createNewTask = () => {
    taskArray.addTask("new task", undefined, undefined, {
      taskListName: name,
      taskListId: id, 
    })
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if(e.key === "Enter"){
      createNewTask()
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    }
  })

  return (
    <>
      <header contentEditable>{name}</header>
      <div className="taskListToolbar">
        <Stack spacing={2} direction={"row"}>
          <Button variant="text" onClick={handleClickBack}>
            <ArrowBackIcon />
            Back
          </Button>

          <Stack spacing={0.5} direction={"row"}>
            <Button onClick={createNewTask}>
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
