import React from 'react';
import Clock from './Components/Clock.js';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      time: 30
    }
    this.handleClickAdd = this.handleClickAdd.bind(this);
    this.handleClickSub = this.handleClickSub.bind(this);
  }
  handleClickAdd(){
    this.setState({time: this.state.time + 1})
  }
  handleClickSub(){
    this.setState({time: this.state.time - 1})
  }
  render(){
    let generalDisplay = {height: "100vh", backgroundImage: "linear-gradient(to top, #EDAFAA , #5B86E5)"};

    //Break display
    let breakDisplay = {position:"fixed",top:"45%", left:"14.5%", fontSize:"2vw"};
    let breakAddDisplay = {position:"fixed",top:"50%", left:"20%",
    minWidth:"4vw", minHeight:"6vh"}; //mindWidth & minHeight ensure the buttons are the same size
    let breakSubDisplay = {position:"fixed",top:"50%", left:"10%",
    minWidth:"4vw", minHeight:"6vh"};

    //Session display
    let sessionDisplay = {position:"fixed",top:"45%", right:"14.5%", fontSize:"2vw"};
    let sessionAddDisplay = {position:"fixed",top:"50%", right:"22%",
    minWidth:"4vw", minHeight:"6vh"};
    let sessionSubDisplay = {position:"fixed",top:"50%", right:"10%",
    minWidth:"4vw", minHeight:"6vh"};

    return(
      <div style={generalDisplay}>
        <Clock time={this.state.time}/>
        <div>
          <p style={breakDisplay}>Break</p>
          <button onClick={this.handleClickAdd} style={breakAddDisplay}>+</button>
          <button onClick={this.handleClickSub} style={breakSubDisplay}>-</button>
        </div>
        <div>
          <p style={sessionDisplay}>Session</p>
          <button onClick={this.handleClickAdd} style={sessionSubDisplay}>+</button>
          <button onClick={this.handleClickSub} style={sessionAddDisplay}>-</button>
        </div>
      </div>
    )
  }
}

export default App;
