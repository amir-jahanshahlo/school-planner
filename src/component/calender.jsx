import React, { useState } from "react";
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

  const [setSelectedDate] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    // Perform other actions when a date is clicked
  };

  function renderHeader(arg) {
    const weekday = ["S", "M", "T", "W", "T", "F", "S"];
    const dayIndex = arg.date.getDay();
    const isToday = isDateToday(arg.date);
  
    return (
      <div>
        <div>
          <span style={{ fontSize: "10px" }}>{weekday[dayIndex]}</span>
        </div>
        {isToday ? (
          <span
            className={`selectable-circle`}
            onClick={() => handleDateClick(arg.date)}
          >
            {arg.date.getDate()}
          </span>
        ) : (
          <span>{arg.date.getDate()}</span>
        )}
      </div>
    );
  }

  // Customize the time slot duration and format for AM/PM
  const slotDuration = "00:30:00"; // Change this to set the desired duration (30 minutes in this example)
  const slotLabelFormat = {
    hour: "numeric",
    hour12: true, // Use 12-hour clock format (AM/PM)
  };

  const slotLabelContent = (arg) => {
    const { date } = arg;
    const hour = date.getHours();
    const amPm = hour >= 12 ? "pm" : "am";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return (
      <div>
          {formattedHour}
          {amPm}
      </div>
      
    );
  };

  const slotMinTime = "00:00:00";


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
        selectable={true}
        slotDuration={slotDuration} // Apply the custom slot duration
        slotLabelFormat={slotLabelFormat}
        slotLabelContent={slotLabelContent}
        slotMinTime={slotMinTime} // Set the minimum time to start from 12 AM
      />
    </div>
  );
}

export default Calendar;
