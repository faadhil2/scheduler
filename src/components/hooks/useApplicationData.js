import React, {useState, useEffect} from "react";
import axios from "axios"
import "components/Application.scss";


export default function useApplicationData() {

const [state, setState] = useState({
  day: "Monday",
  days: [],
   appointments: {},
   interviewers: {}
});

// Set the day state

const setDay = day => setState({ ...state, day });

// Import days, appointments, interviewers from the API

useEffect(()=>{
  Promise.all([
    axios.get('/api/days'),
    axios.get('/api/appointments'),
    axios.get('/api/interviewers')
  ]).then((all) => {
     setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
}, [])


// bookInterview(): Book/Create an Interview Appointment Function
// Takes in an optional parameter (edit) which indicates whether the spots for
// the day should be incremented or left the same (if editing an appointment). 

function bookInterview(id, interview, edit = false) {
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };

  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

   setState({...state, appointments});
 

  return axios.put(`/api/appointments/${id}`, {interview})
    .then( () => {
      const spotsChangedDays = [...state.days].map( (day) => {
        if(day.name === state.day && edit === false) { // update the spots for the matching day
          day.spots --; //Decrease spots by one when we book an interview
          return day;
        } else {return day}
      }) 
      setState({
        ...state,
        days:[...spotsChangedDays],
        appointments
      });
    })
    
}


// cancelInterview(): Cancel an Interview Appointment Function

function cancelInterview(id){
  const appointment = {
    ...state.appointments[id],
    interview: null
  };

  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  return axios.delete(`/api/appointments/${id}`)
    .then( () => {
      const spotsChangedDays = [...state.days].map( (day) => {
        if(day.name === state.day) { // update the spots for the matching day
          day.spots ++; //Increase spot by 1 when we cancel an interview
          return day;
        } else {return day}
      }) 
      setState({
        ...state,
        days:[...spotsChangedDays],
        appointments
      });
    })
};

return { 
  state,
  setDay,
  bookInterview,
  cancelInterview
}
}