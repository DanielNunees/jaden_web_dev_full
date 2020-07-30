import React from 'react'

import './growl.css'

export const Growl = ({ active, message, onDismissed }) => {
   const [state, setState] = React.useState(true)

   const handleClick = () => {
      setState(false)
      onDismissed()
   }

   return (
      <div className={`growl${active && state ? ' active' : ''}`}>
         {message}
         <div onClick={handleClick} className="growl-close"></div>
      </div>
   )
}

export function useGrowl() {
   // state of the growl
   const [growlActive, setGrowlActive] = React.useState(false)

   return [
      // the first arg is the state
      growlActive,

      // the second arg is a fn that allows you to safely set its state
      (active) => {
         setGrowlActive(active)
      },
      (timeout) => {
         if (!growlActive) { // Just active if isn't active yet
            if (!isNaN(timeout)) { // if timeout isn't a number default is 3000
               setTimeout(function () { setGrowlActive(false); }, timeout);
            }
            else {
               setTimeout(function () { setGrowlActive(false); }, 3000);
            }
         }
      }
   ]
}