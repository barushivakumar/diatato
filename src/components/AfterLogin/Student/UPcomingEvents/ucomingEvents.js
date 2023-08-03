import React, { useState, useRef, useEffect } from "react";
import Header from "../../Header/header";
import Sidebar from "../../Sidemenu/Sidebar";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
const localizer = momentLocalizer(moment);
const UpcomingEvents = () => {
  const handleDelete = (event) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    
    if (confirmDelete) {
      const updatedEvents = events.filter((item) => item !== event);
      setEvents(updatedEvents);
    }
  };
    const [events, setEvents] = useState([]);
  
    const handleSelect = ({ start, end }) => {
      const title = window.prompt('New Event name');
      if (title) {
        const newEvent = {
          start,
          end,
          title,
        };
        setEvents([...events, newEvent]);
        console.log(events)
      }
    };
    
  return (
   <>
     <Header/>
        <div className="app d-flex " style={{position:'absolute',width:'100%',height:'calc(100vh - 120px)'}}>
          <Sidebar/>
          <div className="componentContainer">
       <div className="ComponentInnerContainer" style={{padding:'20px'}}>
       
        <h2>UpcomingEvents</h2>
        <div>
        <Calendar
  localizer={localizer}
  events={events}
  startAccessor="start"
  endAccessor="end"
  selectable
  onSelectSlot={handleSelect}
  timeslots={2}
  onSelectEvent={handleDelete}
  style={{ height: 500 ,padding:"35px"}}
/>
    </div>
       </div>
     </div>
     
        </div>
     
   </>
  );
}


export default UpcomingEvents;