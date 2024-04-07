import {
  Task,
  TaskWithSingularTaskList,
} from "../context/TaskContext";
import useTaskContext from "../hooks/useTaskContext";
import TaskListOverview from "./TaskListOverview";

import "./styles/taskLists.css";

function TaskLists() {
  const { taskArray } = useTaskContext();

  const formatTaskLists = (tasks: Task[]) => {
    const formattedTaskLists: {
      name: string;
      id: string;
      tasks: TaskWithSingularTaskList[];
      lastModified: Date;
    }[] = [];
    tasks.forEach((task) => {
      if (task.taskList !== null) {
        task.taskList.forEach((taskListInstance) => {
          const taskListId = taskListInstance.taskListId;
          const taskListIndex = formattedTaskLists.findIndex(
            (taskList) => taskList.id === taskListId
          );
          // task list with name already exists in array
          if (taskListIndex !== -1) {
            formattedTaskLists[taskListIndex].tasks.push({
              ...task,
              taskList: taskListInstance,
            });
          }
          // task list with name does not yet exist in array
          else {
            formattedTaskLists.push({
              name: taskListInstance.taskListName,
              id: taskListId,
              tasks: [
                {
                  ...task,
                  taskList: taskListInstance,
                },
              ],
              lastModified: new Date(),
            });
          }
        });
      }
      formattedTaskLists.forEach((taskList) => {
        let latestDate = taskList.tasks[0].taskList.lastModified;
        taskList.tasks.forEach((task) => {
          if (task.taskList.lastModified > latestDate) {
            latestDate = task.taskList.lastModified;
          }
        });
        taskList.lastModified = latestDate;
      });
    });
    return formattedTaskLists;
  };

  const formattedTaskLists = formatTaskLists(taskArray.taskArray.array);

  formattedTaskLists.sort((a, b) => {
    return b.lastModified.getTime() - a.lastModified.getTime();
  });

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
