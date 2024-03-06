interface Props {
  date: Date;
  firstDayOfMonth: number;
  lastDateOfMonth: number;
  lastDayOfMonth: number;
  lastDateOfLastMonth: number;
  currentMonth: number;
  currentYear: number;
  height: number;
}

interface day {
  day: number;
  class: "currentDay" | "inactiveDay" | "normalDay";
}

function Days({
  date,
  firstDayOfMonth,
  lastDateOfMonth,
  lastDayOfMonth,
  lastDateOfLastMonth,
  currentMonth,
  currentYear,
  height,
}: Props) {
  const renderCalendar = () => {
    const daysList: day[] = [];

    for (let i = firstDayOfMonth; i > 0; i--) {
      daysList.push({ day: lastDateOfLastMonth - i + 1, class: "inactiveDay" });
    }
    for (let i = 1; i <= lastDateOfMonth; i++) {
      daysList.push({
        day: i,
        class:
          i === date.getDate() &&
          currentMonth === new Date().getMonth() &&
          currentYear === new Date().getFullYear()
            ? "currentDay"
            : "normalDay",
      });
    }
    for (let i = lastDayOfMonth; i < 6; i++) {
      daysList.push({ day: i - lastDayOfMonth + 1, class: "inactiveDay" });
    }
    return daysList;
  };

  const daysList = renderCalendar();

  return (
    <ul className="days" style={{ height: `calc(100% - ${height}px)` }}>
      {daysList.map((day, index) => (
        <li className={day.class} key={index}>
          {day.day}
        </li>
      ))}
    </ul>
  );
}

export default Days;
