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


export function getInterview(state, interview){

  if (interview === null){
    return null;
  }

  let interviewObj = {student: interview.student}

  for (let element in state.interviewers){
    if (state.interviewers[element].id === interview.interviewer){
      interviewObj.interviewer = state.interviewers[element]
      return interviewObj;
    }
  }
}


export function getInterviewersForDay(state, day) {
  let interviewer;
  const interviewerList = [];


  for (let element of state.days){
    if (element.name === day){
      interviewer = element.appointments;
    }
  }

  if (interviewer === undefined){
    return [];
  }

  for (let element in state.interviewers){
    for (let x = 0; x < interviewer.length; x++){
      if (state.interviewers[element].id === interviewer[x]){
        interviewerList.push(state.interviewers[element])
      }
    }
  }

  return interviewerList
  // return appointments;
}