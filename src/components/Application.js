import React, {useState, useEffect} from "react";
import axios from "axios"

import "components/Application.scss";
import DayList from "./DayList";
import "components/Appointment"
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
     appointments: {},
     interviewers: {}
  });

  
  

  const setDay = day => setState({ ...state, day });

  // const setDays = days => setState({ ...state, days });
  const setDays = days => setState(prev => ({ ...prev, days }));

  // useEffect(()=>{
  //   Promise.all([
  //     axios.get('http://localhost:8001/api/days').then(request => {
  //       return request.data}),
  //     axios.get('http://localhost:8001/api/appointments').then(request => {
  //       return request.data}),
  //     axios.get('http://localhost:8001/api/interviewers').then(request => {
  //       return request.data})
  //   ]).then((all) => {
  //      setState(prev => ({...prev, days: all[0], appointments: all[1], interviewers: all[2] }));
  //     })
  // })

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
      .then(() => setState( { ...state,
        appointments}))
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
      .then(() => setState(  {...state,
        appointments}))
  };


  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const appointmentList = dailyAppointments.map(appointment => {
    const interviewersForDay = getInterviewersForDay(state, state.day);
    const interview = getInterview(state, appointment.interview);
    return (
    <Appointment 
      key={appointment.id} 
      {...appointment} 
      interview={interview}
      interviewers={interviewersForDay}
      bookInterview={bookInterview}
      cancelInterview = {cancelInterview}
    />
    );
  });



  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
