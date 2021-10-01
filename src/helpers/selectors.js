export function getAppointmentsForDay(state, day) {
  let appointments;
  const appointmentList = [];

  for (let element of state.days){
    if (element.name === day){
      appointments = element.appointments;
    }
  }

  if (appointments === undefined){
    return [];
  }

  for (let element in state.appointments){
    for (let x = 0; x < appointments.length; x++){
      if (state.appointments[element].id === appointments[x]){
        appointmentList.push(state.appointments[element])
      }
    }
  }
  return appointmentList
  // return appointments;
}