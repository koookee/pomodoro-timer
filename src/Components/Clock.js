import React from 'react';
import ClockLogo from '../Logos/circle.png'
class Clock extends React.Component{
  constructor(){
    super();
  }
  render(){
    let clockDisplay = {position:"fixed",top:"50%", left:"50%", transform:"translate(-50%,-50%)"}
    return(
      <div>
      <img style={clockDisplay} src={ClockLogo} alt="Clock Logo" />
      </div>
    )
  }
}


export default Clock;
