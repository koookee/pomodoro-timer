import React from 'react';
import ClockLogo from '../Logos/circle.png';
import '../CSS/Clock.css';
import * as Icon from 'react-bootstrap-icons';


class Clock extends React.Component{
  constructor(){
    super();
    this.countdown = this.countdown.bind(this);
  }
  countdown(){
    console.log("Test");
  }
  render(){
    let clockDisplay = {
      position:"fixed",top:"50%", left:"50%", transform:"translate(-50%,-50%)", width: "40vw",
      height: "auto"
    };
    let timer = {
      position:"fixed",top:"40%", left:"50%", transform:"translate(-50%,-50%)"
    };
    let minutes = Math.floor(this.props.time / 60);
    let seconds = this.props.time % 60;
    minutes = ("0" + minutes).slice(-2); //Transforms the number to two digits. ex: 7 -> 07
    seconds = ("0" + seconds).slice(-2);
    return(
      <div>
        <img style={clockDisplay} src={ClockLogo} alt="Clock Logo" />
        <p style={timer}>{minutes}:{seconds}</p>
        <div style={timer}>{this.props.phase}</div>
      </div>
    )
  }
}

export default Clock;
