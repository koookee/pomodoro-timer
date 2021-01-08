import Clock from './Components/Clock.js';

function App() {
  let display = {height: "100vh", backgroundImage: "linear-gradient(to top, #EDAFAA , #5B86E5)"}
  return (
    <div style={display}>
    <Clock />
    </div>
  );
}

export default App;
