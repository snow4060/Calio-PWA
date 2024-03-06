import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChecklistIcon from "@mui/icons-material/Checklist";
import NotesIcon from "@mui/icons-material/Notes";
import SettingsIcon from "@mui/icons-material/Settings";

import "./styles/leftPanel.css";
import { Tab } from "../../App";

interface Props{
  setTab: React.Dispatch<React.SetStateAction<Tab>>
}

function LeftPanel({setTab}: Props) {
  return (
    <div className="leftPanel">
      <div className="bookmarkContainer" onClick={() => setTab("calendar")}>
        <svg width="125" height="100">
          <polygon
            className="bookmark"
            id="calendar-button"
            points="25,0 125,0 125,100 25,100 55,50"
          />
        </svg>
        <CalendarMonthIcon className="icon" />
      </div>
      <div className="bookmarkContainer" onClick={() => setTab("task list")}>
        <svg width="125" height="100">
          <polygon
            className="bookmark"
            id="task-list-button"
            points="25,0 125,0 125,100 25,100 55,50"
          />
        </svg>
        <ChecklistIcon className="icon" />
      </div>
      <div className="bookmarkContainer" onClick={() => setTab("notes")}>
        <svg width="125" height="100">
          <polygon
            className="bookmark"
            id="notes-button"
            points="25,0 125,0 125,100 25,100 55,50"
          />
        </svg>
        <NotesIcon className="icon" />
      </div>
      <div className="bookmarkContainer" onClick={() => setTab("settings")}>
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
