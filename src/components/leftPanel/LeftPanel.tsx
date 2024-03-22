import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChecklistIcon from "@mui/icons-material/Checklist";
import NotesIcon from "@mui/icons-material/Notes";
import SettingsIcon from "@mui/icons-material/Settings";

import "./styles/leftPanel.css";
import Calendar from "../calendar/Calendar";
import TaskLists from "../taskList/TaskLists";
import Notes from "../notes/Notes";
import Settings from "../settings/Settings";
import useTabContext from "../hooks/useTabContext";

function LeftPanel() {
  const {setTab} = useTabContext();
  return (
    <div className="leftPanel">
      <div className="bookmarkContainer" onClick={() => setTab(<Calendar />)}>
        <svg width="125" height="100">
          <polygon
            className="bookmark"
            id="calendar-button"
            points="25,0 125,0 125,100 25,100 55,50"
          />
        </svg>
        <CalendarMonthIcon className="icon" />
      </div>
      <div className="bookmarkContainer" onClick={() => setTab(<TaskLists />)}>
        <svg width="125" height="100">
          <polygon
            className="bookmark"
            id="task-list-button"
            points="25,0 125,0 125,100 25,100 55,50"
          />
        </svg>
        <ChecklistIcon className="icon" />
      </div>
      <div className="bookmarkContainer" onClick={() => setTab(<Notes />)}>
        <svg width="125" height="100">
          <polygon
            className="bookmark"
            id="notes-button"
            points="25,0 125,0 125,100 25,100 55,50"
          />
        </svg>
        <NotesIcon className="icon" />
      </div>
      <div className="bookmarkContainer" onClick={() => setTab(<Settings />)}>
        <svg width="125" height="100">
          <polygon
            className="bookmark"
            id="settings-button"
            points="25,0 125,0 125,100 25,100 55,50"
          />
        </svg>
        <SettingsIcon className="icon" />
      </div>
    </div>
  );
}

export default LeftPanel;
