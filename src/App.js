import React from 'react';
import Clock from './Components/Clock.js';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      breakTime: 5, //Duration of breakTime in minutes
      currentBreakTime: 5*60, //Value changes (decreases) when the timer starts or gets unpaused. *60 is to convert it to seconds
      sessionTime: 25,
      currentSessionTime: 25*60,
      sessionActive: true,
      breakActive: false,
      timerRunning: false
    }
    this.handleClickAddMinute = this.handleClickAddMinute.bind(this);
    this.handleClickSubMinute = this.handleClickSubMinute.bind(this);
    this.handleClickPlay = this.handleClickPlay.bind(this);
    this.handleClickReset = this.handleClickReset.bind(this);
    this.decreaseTimer = this.decreaseTimer.bind(this);
  }

  timer; // Variable that gets assigned setInterval

  handleClickAddMinute(phase){
    if(this.state.breakTime < 60 && !this.state.timerRunning && phase == "Break"){
      this.setState({breakTime: this.state.breakTime + 1},
        () => this.setState({currentBreakTime: this.state.breakTime * 60}))
    }
    if(this.state.sessionTime < 60 && !this.state.timerRunning && phase == "Session"){
      this.setState({sessionTime: this.state.sessionTime + 1},
        () => this.setState({currentSessionTime: this.state.sessionTime * 60}))
    }
  }
  handleClickSubMinute(phase){
    if(this.state.breakTime > 1 && !this.state.timerRunning && phase == "Break"){
      this.setState({breakTime: this.state.breakTime - 1},
        () => this.setState({currentBreakTime: this.state.breakTime * 60}))
    }
    if(this.state.sessionTime > 1 && !this.state.timerRunning && phase == "Session"){
      this.setState({sessionTime: this.state.sessionTime - 1},
        () => this.setState({currentSessionTime: this.state.sessionTime * 60}))
    }
  }
  handleClickPlay(){ // Starts or pauses the timer
    if(this.state.timerRunning == false){
      this.timer = setInterval(this.decreaseTimer,1000);
      this.setState({timerRunning:true})
    }
    if(this.state.timerRunning == true){
      clearTimeout(this.timer);
      this.setState({timerRunning:false})
    }
  }
  handleClickReset(){  //Resets the clock back to the initial state
    this.setState({
      breakTime: 5,
      currentBreakTime: 5*60,
      sessionTime: 25,
      currentSessionTime: 25*60,
      sessionActive: true,
      breakActive: false,
      timerRunning: false
    })
    clearTimeout(this.timer);
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
  }
  decreaseTimer(){ //Subtracts 1 from the timer every second
    if(this.state.sessionActive){
      this.setState({currentSessionTime: this.state.currentSessionTime - 1}, () => {
        if(this.state.currentSessionTime < 0) { //Checks if the timer is done (reached 00:00)
          this.setState({sessionActive : false});
          this.setState({breakActive : true});
          this.setState({currentBreakTime: this.state.breakTime*60}) //Resets it back to the initial value before transitioning
          document.getElementById("beep").play();
        }
      })
    }
    else{
      this.setState({currentBreakTime: this.state.currentBreakTime - 1}, () => {
        if(this.state.currentBreakTime < 0) { //Checks if the timer is done (reached 00:00)
          this.setState({sessionActive : true});
          this.setState({breakActive : false});
          this.setState({currentSessionTime: this.state.sessionTime*60})
          document.getElementById("beep").play();
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
    let sessionSubDisplay = {position:"fixed",top:"50%", right:"22%",
    minWidth:"4vw", minHeight:"6vh"};
    let sessionAddDisplay = {position:"fixed",top:"50%", right:"10%",
    minWidth:"4vw", minHeight:"6vh"};

    return(
      <div style={generalDisplay}>
        <div>
          <Clock time={this.state.sessionActive? this.state.currentSessionTime:this.state.currentBreakTime}
          phase={this.state.sessionActive? "Session" : "Break"}/>
          <audio id="beep" src="https://sampleswap.org/samples-ghost/INSTRUMENTS (SINGLE SAMPLES)/Bells/1128[kb]one-pretty-bell.wav.mp3" type="audio/mpeg" />
          <button onClick={this.handleClickPlay} style={breakDisplay("70%")} id="start_stop">|></button>
          <button onClick={this.handleClickReset} style={breakDisplay("80%")} id="reset">|</button>
        </div>
        <div>
          <p style={breakDisplay("45%")} id="break-label">Break</p>
          <button onClick={this.handleClickAddMinute.bind(this,"Break")} id="break-increment" style={breakAddDisplay}>+</button>
          <button onClick={this.handleClickSubMinute.bind(this,"Break")} id="break-decrement" style={breakSubDisplay}>-</button>
          <p style={breakDisplay("55%")} id="break-length">{this.state.breakTime}</p>
        </div>
        <div>
          <p style={sessionDisplay("45%")} id="session-label">Session</p>
          <button onClick={this.handleClickAddMinute.bind(this,"Session")} id="session-increment" style={sessionAddDisplay}>+</button>
          <button onClick={this.handleClickSubMinute.bind(this,"Session")} id="session-decrement"style={sessionSubDisplay}>-</button>
          <p style={sessionDisplay("55%")} id="session-length">{this.state.sessionTime}</p>
        </div>
      </div>
    )
  }
}

export default App;
