import TaskListHeader from "./TaskListHeader";
import TaskListTask from "./TaskListTask";

import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import TaskListTasksWrapper from "./TaskListTasksWrapper";
import useTaskContext from "../hooks/useTaskContext";
import { formatTaskLists } from "./formatTaskList";

interface Props {
  name: string;
  id: string;
}

function TaskList({ name, id }: Props) {
  const { taskArray } = useTaskContext();

  const allTaskLists = formatTaskLists(taskArray.taskArray.array).filter(taskList => taskList.id === id);
  const tasks =  allTaskLists.length > 0 ? allTaskLists[0].tasks : []; 

  const sortedTaskList = tasks
    .slice()
    .sort((a, b) => a.taskList.index - b.taskList.index);

  const handleDragEnd = (result: DropResult) => {
    if (result == null || result.destination == null) return;
    const { source, destination } = result;
    taskArray.reindexTaskList(id, source.index, destination.index);
  };

  return (
    <>
      <div className="taskList rightPanel">
        <TaskListHeader name={name} />

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="tasks-wrapper">
            {(provided) => (
              <TaskListTasksWrapper
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {sortedTaskList.map((task, index) => {
                  return (
                    <Draggable
                      draggableId={task.id}
                      index={index}
                      key={task.id}
                    >
                      {(_provided, _snapshot) => (
                        <TaskListTask
                          ref={_provided.innerRef}
                          taskListId={id}
                          dragHandleProps={_provided.dragHandleProps}
                          {..._provided.draggableProps}
                          snapshot={_snapshot}
                          task={task}
                        >
                          {provided ? provided.placeholder : null}
                        </TaskListTask>
                      )}
                    </Draggable>
                  );
                })}
              </TaskListTasksWrapper>
            )}
          </Droppable>
        </DragDropContext>

        {/* <Sortable className="tasks">
          {sortedTaskList.map((task, index) => (
            <TaskListTask task={task} key={index} />
          ))}
        </Sortable> */}

        {/* <ul className="tasks">
          {
          ))}
        </ul> */}
      </div>
    </>
  );
}

export default TaskList;
