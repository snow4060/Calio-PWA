import { Checkbox } from "@mui/material";
import { TaskWithSingularTaskList } from "../context/TaskContext";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { ReactNode, Ref, forwardRef } from "react";
import {
  DraggableProvidedDragHandleProps,
  DraggableStateSnapshot,
} from "@hello-pangea/dnd";
interface Props {
  task: TaskWithSingularTaskList;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
  snapshot: DraggableStateSnapshot;
  children: ReactNode;
}

const TaskListTask = forwardRef(
  (
    { task, dragHandleProps, snapshot, children, ...rest }: Props,
    ref: Ref<HTMLLIElement>
  ) => {
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
        <span {...dragHandleProps} className="taskDragHandle">
          <DragIndicatorIcon
            className="draggableDragHandle"
            style={{
              color: "black",
              width: "25px"
            }}
          />
        </span>
      </li>
    );
  }
);

export default TaskListTask;
