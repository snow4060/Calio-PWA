import { Stack, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import useTaskContext from "../hooks/useTaskContext";
import { useEffect } from "react";
import useModalContext from "../modal/hooks/useModalContext";
import { ModalFunction } from "../modal/context/ModalContext";
import ImportTask from "../modalContent/ImportTask";
import { useNavigate } from "react-router-dom";
import { whiteText } from "../../styles/colors";

interface Props {
  id: string;
  name: string;
}

function TaskListHeader({ id, name }: Props) {
  const { taskArray } = useTaskContext();
  const { useModal, setOpen } = useModalContext();
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate("/taskList")
  };

  const createNewTask = () => {
    taskArray.addTask("new task", undefined, undefined, {
      taskListName: name,
      taskListId: id,
    });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      createNewTask();
    }
  };

  const handleDeleteTaskList = () => {
    if (!confirm(`Delete ${name}?`)) return;
    taskArray.deleteTaskList(id);
    navigate("/taskList")
  };

  const handleImportTask = (modal: ModalFunction) => {
    modal(<ImportTask taskListId={id} taskListName={name} setModalOpen={setOpen} />, 25)
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

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
            <Button onClick={() => handleImportTask(useModal)}>Import Task</Button>
          </Stack>
        </Stack>
        <Button
          color="error"
          style={{
            color: whiteText,
          }}
          onClick={handleDeleteTaskList}
        >
          Delete List
        </Button>
      </div>
    </>
  );
}

export default TaskListHeader;
