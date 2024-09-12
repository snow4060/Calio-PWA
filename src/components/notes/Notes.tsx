import { Button } from "@mui/material";
import "./styles/notes.css";
import useNoteContext from "../hooks/useNoteContext";
// import NoteOverview from "./NoteOverview.tsx";

function Notes() {
  const noteArray = useNoteContext();

  return (
    <div className="notes rightPanel">
      <header>
        <span>To-Do Lists</span>
        <Button style={{ fontSize: "32px", padding: "none" }}>+</Button>
      </header>
      <div className="divider"></div>
      {/* {formattedTaskLists.map((taskList, index) => (
  <TaskListOverview
    name={taskList.name}
    tasks={taskList.tasks}
    lastModified={taskList.lastModified}
    id={taskList.id}
    key={index}
  />
))} */}
      {/* {noteArray.array.map((note, index) => (
        <NoteOverview />
      ))} */}
    </div>
  );
}

export default Notes;
