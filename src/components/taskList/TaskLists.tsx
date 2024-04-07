import { useEffect } from "react";
import useTaskContext from "../hooks/useTaskContext";
import TaskListOverview from "./TaskListOverview";

import "./styles/taskLists.css";
import { formatTaskLists } from "./formatTaskList";

function TaskLists() {
  const { taskArray } = useTaskContext();

  

  const formattedTaskLists = formatTaskLists(taskArray.taskArray.array);

  formattedTaskLists.sort((a, b) => {
    return b.lastModified.getTime() - a.lastModified.getTime();
  });

  useEffect(() => {
    console.log("dfjsodf");
  }, [taskArray, taskArray.taskArray, taskArray.taskArray.array]);

  return (
    <div className="taskLists rightPanel">
      <header>To-Do Lists</header>
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
