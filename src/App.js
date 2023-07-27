import logo from './logo.svg';
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import './App.css';

function App() {
  // Function to customize the date display
  const dateCellContent = (arg) => {
    return (
      <div>
        
        <span>{arg.dayText}</span>
      </div>
    );
  };

  // Function to customize the time display
  const eventTimeFormat = {
    hour: 'numeric',
    minute: '2-digit',
    meridiem: false, // Use 24-hour time format
  };

  // Function to customize the day header text
  const dayHeaderContent = (arg) => {
    // Custom day names (e.g., Mon, Tue, etc.)
    const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const dayIndex = arg.date.getDay();
    return (
      <div>
        <span>{dayNames[dayIndex]}</span>
      </div>
    );
  };

  const headerToolbar = {
    center: 'title',
    right: 'timeGridWeek,timeGridDay',
  }
  
  return (
    <div className="App">
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek" // Use timeGridWeek or timeGridDay for TimeGrid view
        headerToolbar={headerToolbar}
        dateCellContent={dateCellContent} // Customize date display
        eventTimeFormat={eventTimeFormat} // Customize time display
        dayHeaderContent={dayHeaderContent} // Customize day header text
        allDaySlot={false} // Remove the "all-day" header
      />
    </div>
  );
}

export default App;