import React from "react"

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";

import {useVisualMode} from "../hooks/useVisualMode"

import "./styles.scss"


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT"
const ERROR_SAVE = "ERROR_SAVE"
const ERROR_DELETE = "ERROR_DELETE"

export default function Appointment (props){
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer, edit = false) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true);
    if (edit === true){
      props.bookInterview(props.id, interview, true)
      .then(()=> transition(SHOW))
      .catch(()=> transition(ERROR_SAVE, true))
    }else {
    props.bookInterview(props.id, interview)
    .then(()=> transition(SHOW))
    .catch(()=> transition(ERROR_SAVE, true))
    }
  }

  function onDelete(){
    transition(DELETING, true)
    props.cancelInterview(props.id)
    .then(()=>transition(EMPTY))
    .catch(()=> transition(ERROR_DELETE,true))
    
  }

  function onEdit(){
  transition(EDIT);
  }

return( 
  <article className="appointment">
<Header time = {props.time}/>
{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
{mode === SHOW && (
  <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
    onEdit = {onEdit}
    onDelete = {()=>transition(CONFIRM)}
  />
)}
  {mode === CREATE && (
        <Form
          name={props.name}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
  {mode === SAVING && <Status message = "Saving"/>}
  {mode === DELETING && <Status message = "Deleting"/>}
  {mode === CONFIRM && (
  <Confirm 
  message = "Are you sure you would like to delete?"
  onCancel = {back}
  onConfirm = {onDelete}
  />
  )}
  {mode === EDIT &&
  (
    <Form
    name={props.interview.student}
    interviewers={props.interviewers}
    value = {props.interview.interviewer.id}
    onSave={save}
    onCancel={() => back()}
    edit = {true}
  />
  )}
  {mode === ERROR_SAVE && 
  (<Error
  message = "Saving Error"
  onClose = {back}
  />
  )}
    {mode === ERROR_DELETE && 
  (<Error
  message = "Delete Error"
  onClose = {back}
  />
  )}
  </article>
);
}
