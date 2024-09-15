import useTaskContext from "../hooks/useTaskContext";
import TaskListOverview from "./TaskListOverview";

import "./styles/taskLists.css";
import { formatTaskLists } from "./formatTaskList";
import { Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

function TaskLists() {
  const { taskArray } = useTaskContext();
  const navigate = useNavigate();

  const formattedTaskLists = formatTaskLists(taskArray.taskArray.array);

  formattedTaskLists.sort((a, b) => {
    return b.lastModified.getTime() - a.lastModified.getTime();
  });

  const createNewTaskList = () => {
    const id = uuidv4();
    taskArray.addTask("new task", "", undefined, {
      taskListName: "untitled task list",
      taskListId: id,
    });
    navigate(`/taskList/${id}`)
  };

  return (
    <div className="taskLists rightPanel">
      <header>
        <span>To-Do Lists</span>
        <Button
          style={{ fontSize: "32px", padding: "none" }}
          onClick={createNewTaskList}
        >
          +
        </Button>
      </header>
      <div className="divider"></div>
      {formattedTaskLists.map((taskList, index) => (
        <TaskListOverview
          name={taskList.name}
          tasks={taskList.tasks}
          lastModified={taskList.lastModified}
          id={taskList.id}
          key={index}
        />
      ))}
    </div>
  );
}

export default TaskLists;
