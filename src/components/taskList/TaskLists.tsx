import { Task, TaskWithTaskList } from "../context/TaskContext";
import useTaskContext from "../hooks/useTaskContext";
import TaskListOverview from "./TaskListOverview";

import "./styles/taskLists.css";

function TaskLists() {
  const { taskArray } = useTaskContext();

  const formatTaskLists = (tasks: Task[]) => {
    const formattedTaskLists: {
      name: string;
      taskList: TaskWithTaskList[];
      lastModified: Date;
    }[] = [];
    tasks.forEach((task) => {
      if (task.taskList !== null) {
        task.taskList.forEach((taskListInstance) => {
          const taskListName = taskListInstance.taskListName;
          const taskListIndex = formattedTaskLists.findIndex(
            (taskList) => taskList.name === taskListName
          );
          // task list with name already exists in array
          if (taskListIndex !== -1) {
            formattedTaskLists[taskListIndex].taskList.push(
              task as TaskWithTaskList
            );
          }
          // task list with name does not yet exist in array
          else {
            formattedTaskLists.push({
              name: taskListName,
              taskList: [task as TaskWithTaskList],
              lastModified: new Date(),
            });
          }
        });
      }
      formattedTaskLists.forEach((taskList) => {
        let latestDate: Date = taskList.taskList[0].taskList[0].lastModified;
        taskList.taskList.forEach((task) => {
          if (task.taskList[0].lastModified > latestDate) {
            latestDate = task.taskList[0].lastModified;
          }
        });
        taskList.lastModified = latestDate;
      });
    });
    return formattedTaskLists;
  };

  const formattedTaskLists = formatTaskLists(taskArray.array);

  formattedTaskLists.sort((a, b) => {
    return b.lastModified.getTime() - a.lastModified.getTime();
  });

  console.log(formattedTaskLists);

  return (
    <div className="taskLists rightPanel">
      <header>To-Do Lists</header>
      <div className="divider"></div>
      {formattedTaskLists.map((taskList, index) => (
        <TaskListOverview
          name={taskList.name}
          tasks={taskList.taskList}
          lastModified={taskList.lastModified}
          key={index}
        />
      ))}
    </div>
  );
}

export default TaskLists;
