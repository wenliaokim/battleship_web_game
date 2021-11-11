import Particles from 'react-tsparticles';
import particles from './particles.json';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { HomePage, Rule, Game } from './components';
import './App.css';

export default function App() {

  const showRules = useSelector(state => state.rules);

  return (
    <div className="App">
      <h1>Battleship</h1>
      <Particles className="particle" options={particles}/>
      {showRules ? <Rule /> 
      : 
      <Router>
        <Switch>
          <Route exact path="/" component={() => <HomePage/>} />
          <Route exact path="/Game/:game?" component={() => <Game />} />
          <Redirect to="/"/>
        </Switch>
      </Router>
      }
    </div>
  );
};
