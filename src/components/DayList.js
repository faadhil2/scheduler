import React from "react"
import DayListItem from "./DayListItem";

export default function DayList (props) {
// days:Array a list of day objects (each object includes an id, name, and spots)
// day:String the currently selected day
// setDay:Function accepts the name of the day eg. "Monday", "Tuesday"

const days = props.days.map(day => <DayListItem 
  key={day.id}
  name={day.name} 
  spots={day.spots} 
  selected={day.name === props.day}
  setDay={props.setDay}  />);


return (
  <ul>
{days}
</ul>
)
}