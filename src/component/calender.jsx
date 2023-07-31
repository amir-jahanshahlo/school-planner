import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import '../component/style.css'

function isDateToday(date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate()
  );
}

function Calendar() {
  const headerToolbar = {
    center: "title",
    right: "timeGridWeek,timeGridDay",
  };

  const renderHeader = (arg) => {
    const weekday = ["S", "M", "T", "W", "T", "F", "S"];
    const dayIndex = arg.date.getDay();
    const isToday = isDateToday(arg.date);

    return (
      <div>
        <div>
          <span style={{ fontSize: "10px" }}>{weekday[dayIndex]}</span>
        </div>
        <span
          style={{
            fontSize: "15px",
            borderRadius: "50%",
            padding: "3px",
            background: isToday ? "blue" : "transparent",
            color: isToday ? "white" : "black",
          }}
        >
          {`${arg.date.getDate()}`}
        </span>
      </div>
    );
  };
  

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"timeGridWeek"}
        headerToolbar={headerToolbar}
        allDaySlot={false}
        nowIndicator={true}
        height={1000}
        dayHeaderContent={renderHeader}
      />
    </div>
  );
}

export default Calendar;
