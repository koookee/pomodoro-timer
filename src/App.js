import React from 'react';
import Clock from './Components/Clock.js';

class App extends React.Component{
  constructor(){
    super();
  }
  render(){
    let display = {height: "100vh", backgroundImage: "linear-gradient(to top, #EDAFAA , #5B86E5)"};
    let breakDisplay = {position:"fixed",top:"50%", left:"30%", transform:"translate(-50%,-50%)",
    fontSize:"2vw"};
    let sessionDisplay = {};
    return(
      <div style={display}>
        <Clock />
        <p style={breakDisplay}>Break</p>
        <button style={breakDisplay}>+</button>
          <button style={breakDisplay}>-</button>
      </div>
    )
  }
}

export default App;
