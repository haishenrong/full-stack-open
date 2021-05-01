import logo from './logo.svg';
import './App.css';

function Hello(props) {
  const now = new Date();
  return (
    <div>
        <p>Hello world, it is {now.toString()}</p>
        <p>
          Hello {props.name}, you are {props.bla}
        </p>
    </div>
  )
}

function Footer() {
  return (
    <>
      <a href="https://github.com/haishenrong/">HSR</a>
    </>
  )
}

function App() {
  console.log('Hello from component');
  const name = 'Peter'
  const age = 10
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Hello name = "George" bla = {26+10}/>
        <Hello name = {name} bla = {age}/>
        <Footer />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
