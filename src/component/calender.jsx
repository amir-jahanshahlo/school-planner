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

  const [selectedDate, setSelectedDate] = useState(null);

  const isDateSelected = (date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

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
        
      />
    </div>
  );
}

export default Calendar;
