import { TaskWithTaskList } from "../context/TaskContext";
import useTabContext from "../hooks/useTabContext";
import TaskList from "./TaskList";

interface Props {
  name: string;
  tasks: TaskWithTaskList[];
  lastModified: Date;
}

function TaskListOverview({ name, tasks, lastModified }: Props) {
  const {setTab} = useTabContext();

  let completedTasks = 0;
  for (const task of tasks) {
    if (task.completed) {
      completedTasks++;
    }
  }

  const handleClick = () => {
    setTab(<TaskList name={name} tasks={tasks} />)
  }

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
