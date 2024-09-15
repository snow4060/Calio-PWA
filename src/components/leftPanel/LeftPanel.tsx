import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChecklistIcon from "@mui/icons-material/Checklist";
import NotesIcon from "@mui/icons-material/Notes";
import SettingsIcon from "@mui/icons-material/Settings";

import "./styles/leftPanel.css";
import { Link } from "react-router-dom";

function LeftPanel() {  return (
    <div className="leftPanel">
      <Link to="/calendar" className="bookmarkContainer">
        <svg width="125" height="100">
          <polygon
            className="bookmark"
            id="calendar-button"
            points="25,0 125,0 125,100 25,100 55,50"
          />
        </svg>
        <CalendarMonthIcon className="icon" />
      </Link>
      <Link to="/taskList" className="bookmarkContainer">
        <svg width="125" height="100">
          <polygon
            className="bookmark"
            id="task-list-button"
            points="25,0 125,0 125,100 25,100 55,50"
          />
        </svg>
        <ChecklistIcon className="icon" />
      </Link>
      <Link to="/notes" className="bookmarkContainer">
        <svg width="125" height="100">
          <polygon
            className="bookmark"
            id="notes-button"
            points="25,0 125,0 125,100 25,100 55,50"
          />
        </svg>
        <NotesIcon className="icon" />
      </Link>
      <Link to="/settings" className="bookmarkContainer">
        <svg width="125" height="100">
          <polygon
            className="bookmark"
            id="settings-button"
            points="25,0 125,0 125,100 25,100 55,50"
          />
        </svg>
        <SettingsIcon className="icon" />
      </Link>
    </div>
  );
}

export default LeftPanel;
