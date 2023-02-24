import React, { useReducer } from "react";
import moment from "moment";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const NUM_WEEk = [0, 1, 2, 3, 4, 5];
const today = new Date();

const Calendar = (props) => {
  const [state, setState] = useReducer((state, newState) => ({ ...state, ...newState }), {
    selectedDate: today.getDate(),
    selectedMonth: today.getMonth() + 1,
    selectedYear: today.getFullYear(),
  });

  const isDisableDay = (num, daysInMonth) => {
    if (num >= daysInMonth) {
      return true;
    }
    return false;
  };

  const drawCalendar = () => {
    let i = 0;
    const { selectedMonth, selectedYear } = state;
    const startMonth = moment(`${selectedYear}-${selectedMonth}`, "YYYY-MM").startOf("month").format("ddd");
    const year = today.getFullYear(),
      month = today.getMonth() + 1;
    const numInMonth = moment(`${selectedYear}-${selectedMonth}`, "YYYY-MM").daysInMonth();
    return NUM_WEEk.map((num, index) => (
      <tr key={`day-${num}-${index}`}>
        {WEEK_DAYS.map((day, n) => {
          if (!isDisableDay(i, numInMonth) && (startMonth === day || i > 0)) {
            i += 1;
            return (
              <td
                key={`num-${num}-${n}`}
                id={i === today.getDate() && selectedMonth === month && year === selectedYear ? "today" : ""}
                className={day === "Sun" ? "sunday" : ""}
              >
                {i}
              </td>
            );
          }
          return <td key={`num-day-${n}`} className="disabled"></td>;
        })}
      </tr>
    ));
  };

  const onPrevMonth = () => {
    const { selectedMonth, selectedYear } = state;
    if(selectedMonth <= 1) {
      const year = parseInt(selectedYear) - 1;
      setState({
        selectedMonth: 12,
        selectedYear: year
      });
    } else {
      setState({
        selectedMonth: selectedMonth - 1
      });
    }
  }

  const onNextMonth = () => {
    const { selectedMonth, selectedYear } = state;
    if(selectedMonth >= 12) {
      setState({
        selectedMonth: 1,
        selectedYear: selectedYear + 1
      });
    } else {
      setState({
        selectedMonth: selectedMonth + 1
      });
    }
  }

  return (
    <Card border="light" className="shadow-sm calendar-container">
      <Card.Body>
        <div className="elegant-calencar d-md-flex flex-column">
          <div
            className="wrap-header d-flex align-items-center img"
          >
            <p id="reset">Today</p>
            <div id="header" className="p-0">
              <div className="head-info">
                <div className="head-month mt-3">
                  {moment.months(today.getMonth())} - {today.getFullYear()}
                </div>
                <div className="head-day">{state.selectedDate}</div>
              </div>
            </div>
          </div>
          <div className="calendar-wrap">
            <div className="w-100 button-wrap">
              <div className="pre-button d-flex align-items-center justify-content-center" onClick={() => onPrevMonth()}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </div>
              <div className="d-flex align-items-center justify-content-center text-month">
                {moment.months(state.selectedMonth - 1)} - {state.selectedYear}
              </div>
              <div className="next-button d-flex align-items-center justify-content-center" onClick={() => onNextMonth()}>
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
            </div>
            <table id="calendar">
              <thead>
                <tr>
                  {WEEK_DAYS.map((day) => (
                    <th key={day}>{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>{drawCalendar()}</tbody>
            </table>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Calendar;
