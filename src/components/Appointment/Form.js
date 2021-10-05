import React, {useState} from "react"
import index from "./index"
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";


export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.value || null);

  let {interviewers} = props;


  const reset = function (){
    setName("")
    setInterviewer(null)
  }

  const cancel = function (){
    reset();
    props.onCancel()
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit = {event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value = {name}
            onChange = {(event)=> setName(event.target.value)}
          /*
            This must be a controlled component
          */
          />
        </form>
        {/* <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} /> */}
        <InterviewerList interviewers={interviewers} value={interviewer} onChange={setInterviewer} />
      </section>                                                          
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick = {cancel}>Cancel</Button>
          <Button confirm onClick = {event => props.onSave(name, interviewer)}>Save</Button>
        </section>
      </section>
    </main>

  );
}