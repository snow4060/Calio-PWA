import "./styles/calendar.css";

import { useLayoutEffect, useRef, useState } from "react";
import useDate from "./hooks/useDate";
import Days from "./Days";
import { IconButton } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function Calendar() {
  const headerRef = useRef<HTMLDivElement>(null);
  const weeksRef = useRef<HTMLUListElement>(null);
  const [daysHeight, setDaysHeight] = useState(0);
  useLayoutEffect(() => {
    if (!headerRef.current || !weeksRef.current) return;
    const height =
      headerRef.current?.clientHeight + weeksRef.current?.clientHeight;
    setDaysHeight(height);
    console.log(height);
  }, []);

  const {
    date,
    setDate,
    currentYear,
    currentMonth,
    firstDayOfMonth,
    lastDateOfMonth,
    lastDayOfMonth,
    lastDateOfLastMonth,
  } = useDate();

  const handleClickPrevMonth = () => {
    setDate(new Date(currentYear, currentMonth - 1, new Date().getDate()));
  };

  const handleClickNextMonth = () => {
    setDate(new Date(currentYear, currentMonth + 1, new Date().getDate()));
  };

  return (
    <div className="calendar rightPanel">
      <header className="calendarHeader" ref={headerRef} >
        <p className="currentDate">
          {months[currentMonth]} {currentYear}
        </p>
        <div className="icons">
          <IconButton onClick={handleClickPrevMonth}>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton onClick={handleClickNextMonth}>
            <ChevronRightIcon />
          </IconButton>
        </div>
      </header>
      <ul className="weeks" ref={weeksRef}>
        <li>S</li>
        <li>M</li>
        <li>T</li>
        <li>W</li>
        <li>T</li>
        <li>F</li>
        <li>S</li>
      </ul>
      <Days
        date={date}
        firstDayOfMonth={firstDayOfMonth}
        currentMonth={currentMonth}
        currentYear={currentYear}
        lastDateOfLastMonth={lastDateOfLastMonth}
        lastDateOfMonth={lastDateOfMonth}
        lastDayOfMonth={lastDayOfMonth}
        height={daysHeight}
      />
    </div>
  );
}

export default Calendar;
