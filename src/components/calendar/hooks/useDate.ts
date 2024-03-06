import { useState } from "react";

function useDate() {
  const [date, setDate] = useState<Date>(new Date());
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const lastDayOfMonth = new Date(
    currentYear,
    currentMonth,
    lastDateOfMonth
  ).getDay();
  const lastDateOfLastMonth = new Date(currentYear, currentMonth, 0).getDate();

  return {
    date,
    setDate,
    currentYear,
    currentMonth,
    firstDayOfMonth,
    lastDateOfMonth,
    lastDayOfMonth,
    lastDateOfLastMonth,
  };
}

export default useDate;
