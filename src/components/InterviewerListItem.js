import React from "react";
import classNames from "classnames"

import "./InterviewerListItem.scss";

export default function InterviewerListItem(props) {
const {name, avatar} = props;

const interviewerClass = classNames("interviewers__item", {"interviewers__item--selected": props.selected})

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {props.selected && name}
    </li>
  );
}