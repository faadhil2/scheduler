import { useState } from "react"

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);


    function transition(newState, replace= false) {
      if (replace === true){
         setHistory(history[history.length-1] = newState)
        //  history[history.length-1] = newState
      }else{
         setHistory([...history,newState])
        //  history.push(newState)
      }
      setMode(newState)
    }
  
    function back() {
      if (history.length - 1 >= 1){
      history.pop()
      setMode(history[history.length-1])
      }
    }

    
 return {mode, transition, back}
}

