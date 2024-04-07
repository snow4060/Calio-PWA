import { TaskWithSingularTaskList } from "../context/TaskContext";
import useTabContext from "../hooks/useTabContext";
import TaskList from "./TaskList";

interface Props {
  name: string;
  tasks: TaskWithSingularTaskList[];
  lastModified: Date;
  id: string;
}

function TaskListOverview({ name, tasks, lastModified, id }: Props) {
  const { setTab } = useTabContext();

  let completedTasks = 0;
  for (const task of tasks) {
    if (task.completed) {
      completedTasks++;
    }
  }

  const handleClick = () => {
    setTab(<TaskList id={id}/>);
  };

  return (
    <>
      <div className="taskOverview" onClick={handleClick}>
        <b>
          <div className="title">{name}</div>
        </b>
        <span className="details">
          {tasks.length} tasks, {completedTasks} completed
        </span>
        <span className="date">
          last modified
          {` ${
            lastModified.getMonth() + 1
          }/${lastModified.getDate()}/${lastModified.getFullYear()}`}
        </span>
      </div>
      <div className="divider"></div>
    </>
  );
}

export default TaskListOverview;
