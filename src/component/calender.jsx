import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../component/style.css";

function isDateToday(date) {
  const today = new Date();
  return date.getDate() === today.getDate();
}

function Calendar() {
  const calendarRef = React.createRef();

  const headerToolbar = {
    center: "title",
    right: "timeGridWeek,timeGridDay",
  };

  const [selectedDateRange, setSelectedDateRange] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDateRange({ start: date, end: date });
  };

  const handleDateRangeSelect = (arg) => {
    const { start, end } = arg;
    setSelectedDateRange({ start, end });
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
          <span className={`selectable-circle`} onClick={() => handleDateClick(arg.date)}>
            {arg.date.getDate()}
          </span>
        ) : (
          <span>{arg.date.getDate()}</span>
        )}
      </div>
    );
  }

  const slotLabelContent = (arg) => {
    const { date } = arg;
    const hour = date.getHours();
    const amPm = hour >= 12 ? "pm" : "am";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;

    if (selectedDateRange && date >= selectedDateRange.start && date < selectedDateRange.end) {
      return (
        <div className="selected-slot" onClick={() => handleDateRangeSelect(selectedDateRange)}>
          {formattedHour} {amPm}
        </div>
      );
    }

    return (
      <div onClick={() => handleDateClick(date)}>
        {formattedHour} {amPm}
      </div>
    );
  };

  return (
    <div>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"timeGridWeek"}
        headerToolbar={headerToolbar}
        allDaySlot={false}
        nowIndicator={true}
        height={1000}
        dayHeaderContent={renderHeader}
        selectable={true}
        slotDuration={"00:30:00"}
        slotLabelFormat={{ hour: "numeric", hour12: true }}
        slotLabelContent={slotLabelContent}
        slotMinTime={"00:00:00"}
        select={e => {
          // console.log(start, end, jsEvent, view);
          let calendarApi = calendarRef.current.getApi()
          calendarApi.addEvent({
            title: 'asd',
            date: e.startStr
          })
        }}
        // Determines whether the events on the calendar can be modified.
        editable={true}
        dayMaxEvents= {true} // when too many events in a day, show the popover
        // Allow events’ start times to be editable through dragging.
        eventStartEditable={true}
        // Whether the user can resize an event from its starting edge.
        eventResizableFromStart={true}
        // eventDurationEditable={true} i dont know what the hell is this
        droppable={true}
      />
    </div>
  );
}

export default Calendar;
