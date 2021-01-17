import React from 'react';
import Clock from './Components/Clock.js';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      time: 0,
      breakTime: 5,
      sessionTime: 25,
      sessionActive: true,
      breakActive: false
    }
    this.handleClickAddBreak = this.handleClickAddBreak.bind(this);
    this.handleClickSubBreak = this.handleClickSubBreak.bind(this);
    this.handleClickAddSession = this.handleClickAddSession.bind(this);
    this.handleClickSubSession = this.handleClickSubSession.bind(this);
  }
  handleClickAddBreak(){
    if(this.state.breakTime < 60) this.setState({breakTime: this.state.breakTime + 1})
  }
  handleClickSubBreak(){
    if(this.state.breakTime > 1) this.setState({breakTime: this.state.breakTime - 1})
  }
  handleClickAddSession(){
    if(this.state.sessionTime < 60)this.setState({sessionTime: this.state.sessionTime + 1})
  }
  handleClickSubSession(){
    if(this.state.sessionTime > 1)this.setState({sessionTime: this.state.sessionTime - 1})
  }
  render(){
    let generalDisplay = {height: "100vh", backgroundImage: "linear-gradient(to top, #EDAFAA , #5B86E5)"};

    //Break display
    function breakDisplay(topValue){
      return {position:"fixed",top:topValue, left:"14.5%", fontSize:"2vw"}
    }
    let breakAddDisplay = {position:"fixed",top:"50%", left:"20%",
    minWidth:"4vw", minHeight:"6vh"}; //mindWidth & minHeight ensure the buttons are the same size
    let breakSubDisplay = {position:"fixed",top:"50%", left:"10%",
    minWidth:"4vw", minHeight:"6vh"};

    //Session display
    function sessionDisplay(topValue){
      return {position:"fixed",top:topValue, right:"14.5%", fontSize:"2vw"}
    }
    let sessionAddDisplay = {position:"fixed",top:"50%", right:"22%",
    minWidth:"4vw", minHeight:"6vh"};
    let sessionSubDisplay = {position:"fixed",top:"50%", right:"10%",
    minWidth:"4vw", minHeight:"6vh"};

    return(
      <div style={generalDisplay}>
        <Clock time={this.state.sessionActive? this.state.sessionTime:this.state.breakTime}
        phase={this.state.sessionActive? "Session" : "Break"}/>
        <div>
          <p style={breakDisplay("45%")}>Break</p>
          <button onClick={this.handleClickAddBreak} style={breakAddDisplay}>+</button>
          <button onClick={this.handleClickSubBreak} style={breakSubDisplay}>-</button>
          <p style={breakDisplay("55%")}>{this.state.breakTime}</p>
        </div>
        <div>
          <p style={sessionDisplay("45%")}>Session</p>
          <button onClick={this.handleClickAddSession} style={sessionSubDisplay}>+</button>
          <button onClick={this.handleClickSubSession} style={sessionAddDisplay}>-</button>
          <p style={sessionDisplay("55%")}>{this.state.sessionTime}</p>
        </div>
      </div>
    )
  }
}

export default App;
