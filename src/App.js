import React from 'react';
import './App.css';
import routes from './routes';
import Nav from './Components/Nav/Nav'
import {withRouter} from 'react-router-dom'

function App(props) {
  return (
    <div className="App">
      <header className="App-header">
      {props.location.pathname !== '/'? <Nav/> : null}
      {routes}
      </header>
      </div>

  );
}


export default withRouter(App)