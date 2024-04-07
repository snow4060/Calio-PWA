import { ReactNode, Ref, forwardRef } from "react";

interface Props {
  children: ReactNode;
}

const TaskListTasksWrapper = forwardRef(
  ({ children }: Props, ref: Ref<HTMLUListElement>) => {
    return (
      <ul ref={ref} style={{ position: "relative" }} className="tasks">
        {children}
      </ul>
    );
  }
);

export default TaskListTasksWrapper;
