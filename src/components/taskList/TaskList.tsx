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
import { useParams } from "react-router-dom";


function TaskList() {
  const { taskArray } = useTaskContext();
  const { id } = useParams();

  const tasks = formatTaskLists(taskArray.taskArray.array).filter(
    (taskList) => taskList.id === id
  )[0].tasks;

  const sortedTaskList = tasks
    .slice()
    .sort((a, b) => a.taskList.index - b.taskList.index);

  const handleDragEnd = (result: DropResult) => {
    if (result == null || result.destination == null) return;
    const { source, destination } = result;
    taskArray.reindexTaskList(id as string, source.index, destination.index);
  };

  return (
    <>
      <div className="taskList rightPanel">
        <TaskListHeader
          name={sortedTaskList[0].taskList.taskListName}
          id={id as string}
        />

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
                          taskListId={id as string}
                          taskListName={task.taskList.taskListName}
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
      </div>
    </>
  );
}

export default TaskList;
