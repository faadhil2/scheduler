import React, {useState, useEffect} from "react";
import axios from "axios"
import "components/Application.scss";


export default function useApplicationData() {

const [state, setState] = useState({
  day: "Monday",
  days: [],
  // you may put the line below, but will have to remove/comment hardcoded appointments variable
   appointments: {},
   interviewers: {}
});


const setDay = day => setState({ ...state, day });

useEffect(()=>{
  Promise.all([
    axios.get('/api/days'),
    axios.get('/api/appointments'),
    axios.get('/api/interviewers')
  ]).then((all) => {
     setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
}, [])



 function bookInterview(id, interview) {
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };

  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  //console.log(id, interview);

   setState({...state, appointments});
 

  return axios.put(`/api/appointments/${id}`, {interview})
    // .then(() => setState( { ...state,
    //   appointments}))
    .then( () => {
      const spotsChangedDays = [...state.days].map( (day) => {
        if(day.name === state.day) { // update the spots for the matching day
          day.spots -= 1; //Decrease spots by one when we book an interview
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
    // .then(() => setState(  {...state,
    //   appointments}))
    .then( () => {
      const spotsChangedDays = [...state.days].map( (day) => {
        if(day.name === state.day) { // update the spots for the matching day
          day.spots += 1; //Increase spot by 1 when we cancel an interview
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

return { // object to return 
  state,
  setDay,
  bookInterview,
  cancelInterview
}
}