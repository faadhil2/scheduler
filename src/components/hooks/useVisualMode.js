import { useState } from "react"

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);


    function transition(newState, replace= false) {
      if (replace === true){
        setHistory(prev => [...prev.slice(0, prev.length - 1), newState]);
        //  setHistory(history[history.length-1] = newState)
        //  history[history.length-1] = newState
      }else{
        setHistory(prev => [...prev, newState]);
        //  setHistory([...history,newState])
        //  history.push(newState)
      }
      setMode(newState)
    }
  
    // const transition = (updatedMode, replace = false) => {
    //   if (replace) {
    //     setHistory((prev) => [...prev.slice(0, prev.length - 1), updatedMode]);
    //   } else {
    //     setHistory((prev) => [...prev, updatedMode]);
    //   }
    //   setMode(updatedMode);
    // };




    function back() {
      if (history.length - 1 >= 1){
      history.pop()
      setMode(history[history.length-1])
      }
    }

    
 return {mode, transition, back}
}

