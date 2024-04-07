import { Checkbox, IconButton } from "@mui/material";
import { TaskWithSingularTaskList } from "../context/TaskContext";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import ClearIcon from "@mui/icons-material/Clear";
import { ReactNode, Ref, forwardRef } from "react";
import {
  DraggableProvidedDragHandleProps,
  DraggableStateSnapshot,
} from "@hello-pangea/dnd";
import useTaskContext from "../hooks/useTaskContext";
interface Props {
  task: TaskWithSingularTaskList;
  taskListId: string;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
  snapshot: DraggableStateSnapshot;
  children: ReactNode;
}

const TaskListTask = forwardRef(
  (
    { task, taskListId, dragHandleProps, snapshot, children, ...rest }: Props,
    ref: Ref<HTMLLIElement>
  ) => {
    const {
      taskArray: { removeTaskListInstance },
    } = useTaskContext();

    const deleteTaskListInstance = () => {
      removeTaskListInstance(taskListId, task.id);
    };

    return (
      <li
        className={"task " + (snapshot.isDragging ? "hovering" : "")}
        ref={ref}
        {...rest}
      >
        <Checkbox
          color="secondary"
          sx={{
            color: "black",
          }}
        />
        <div
          contentEditable
          suppressContentEditableWarning={true}
          className="taskName"
        >
          {task.title}
          <span style={{ display: "none" }}>{children}</span>
        </div>
        <IconButton aria-label="delete" className="deleteTask" onClick={deleteTaskListInstance}>
          <ClearIcon style={{ color: "black" }} />
        </IconButton>
        <span {...dragHandleProps} className="taskDragHandle">
          <DragIndicatorIcon
            className="draggableDragHandle"
            style={{
              color: "black",
              width: "25px",
            }}
          />
        </span>
      </li>
    );
  }
);

export default TaskListTask;
