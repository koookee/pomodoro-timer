import React from 'react';
import Clock from './Components/Clock.js';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      time: 0,
      breakTime: 5,
      currentBreakTime: 5*60, //Value changes when the timer is played. *60 is to convert it to seconds
      sessionTime: 25,
      currentSessionTime: 25*60,
      sessionActive: true,
      breakActive: false,
      timerRunning: false
    }
    this.handleClickAddBreak = this.handleClickAddBreak.bind(this);
    this.handleClickSubBreak = this.handleClickSubBreak.bind(this);
    this.handleClickAddSession = this.handleClickAddSession.bind(this);
    this.handleClickSubSession = this.handleClickSubSession.bind(this);
    this.handleClickPlay = this.handleClickPlay.bind(this);
    this.decreaseTimer = this.decreaseTimer.bind(this);
  }
  timer;
  handleClickAddBreak(){
    if(this.state.breakTime < 60){
      this.setState({breakTime: this.state.breakTime + 1})
      //Consider using a callback in setState({breaktime}) that assigns breakTime to currentBreakTime instead of adding 60
      this.setState({currentcurrentBreakTime: this.state.currentBreakTime + 60})
    }
  }
  handleClickSubBreak(){
    if(this.state.breakTime > 1){
      this.setState({breakTime: this.state.breakTime - 1})
      this.setState({currentcurrentBreakTime: this.state.currentBreakTime - 60})
    }
  }
  handleClickAddSession(){
    if(this.state.sessionTime < 60){
      this.setState({sessionTime: this.state.sessionTime + 1})
      this.setState({currentSessionTime: this.state.currentSessionTime + 60})
    }
  }
  handleClickSubSession(){
    if(this.state.sessionTime > 1){
      this.setState({sessionTime: this.state.sessionTime - 1})
      this.setState({currentSessionTime: this.state.currentSessionTime - 60})
    }
  }
  handleClickPlay(){
    if(!this.state.timerRunning){
      this.timer = setInterval(this.decreaseTimer,1000);
      this.setState({timerRunning:true})
    }
    if(this.state.timerRunning){
      clearTimeout(this.timer);
      this.setState({timerRunning:false})
    }
  }
  decreaseTimer(){ //Subtracts 1 from the timer every second
    if(this.state.sessionActive){
      this.setState({currentSessionTime: this.state.currentSessionTime - 1}, () => {
        if(this.state.currentSessionTime == 0) {
          clearTimeout(this.timer);
          this.sessionActive = !this.sessionActive;
          this.breakActive = !this.breakActive;
        }
      })
    }
    else{
      this.setState({currentBreakTime: this.state.currentBreakTime - 1}, () => {
        if(this.state.currentBreakTime == 0) {
          clearTimeout(this.timer);
          this.sessionActive = !this.sessionActive;
          this.breakActive = !this.breakActive;
        }
      })
    }
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

    function checkIfDone(){ //Checks if the timer is done (reached 00:00)
      if(this.state.currentBreakTime == 0 || this.state.currentSessionTime == 0){
        this.setState({sessionActive: !this.state.sessionActive})
        this.setState({breakActive: !this.state.breakActive})
      }
      clearTimeout(this.timer);

    }

    return(
      <div style={generalDisplay}>
        <div>
          <Clock time={this.state.sessionActive? this.state.currentSessionTime:this.state.currentBreakTime}
          phase={this.state.sessionActive? "Session" : "Break"}/>
          <button onClick={this.handleClickPlay} style={breakDisplay("70%")}>|></button>
        </div>
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
