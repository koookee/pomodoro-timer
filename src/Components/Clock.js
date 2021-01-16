import React from 'react';
import ClockLogo from '../Logos/circle.png';
import '../CSS/Clock.css';
import * as Icon from 'react-bootstrap-icons';


class Clock extends React.Component{
  constructor(){
    super();
  }
  render(){
    let clockDisplay = {
      position:"fixed",top:"50%", left:"50%", transform:"translate(-50%,-50%)", width: "40vw",
      height: "auto"
    };
    let timer = {
      position:"fixed",top:"40%", left:"50%", transform:"translate(-50%,-50%)"
    };
    return(
      <div>
        <img style={clockDisplay} src={ClockLogo} alt="Clock Logo" />
        <p style={timer} type="button">{this.props.time}</p>
        <div style={timer}>{this.props.phase}</div>
      </div>
    )
  }
}


export default Clock;
