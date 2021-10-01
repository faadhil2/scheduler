import React, {useState, useEffect} from "react";
import axios from "axios"

import "components/Application.scss";
import DayList from "./DayList";
import "components/Appointment"
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
     appointments: {},
     interviewers: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const setDay = day => setState({ ...state, day });

  // const setDays = days => setState({ ...state, days });
  const setDays = days => setState(prev => ({ ...prev, days }));

  useEffect(()=>{
    Promise.all([
      axios.get('http://localhost:8001/api/days').then(request => {
        return request.data}),
      axios.get('http://localhost:8001/api/appointments').then(request => {
        return request.data}),
      axios.get('http://localhost:8001/api/interviewers').then(request => {
        return request.data})
    ]).then((all) => {
       setState(prev => ({...prev, days: all[0], appointments: all[1], interviewers: all[2] }));
       console.log(state.appointments)
      })
  })

  const appointmentList = dailyAppointments.map(appointment =><Appointment
    key = {appointment.id}
    {...appointment}
    />
    ) 

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
