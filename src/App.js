import React from 'react';
import './App.css';
import routes from './routes';
import Nav from './Components/Nav/Nav'
import {withRouter} from 'react-router-dom'
import axios from 'axios'












function App(props) {
  return (
    <div className="background">
      <header className="App-header">
      <link href="https://fonts.googleapis.com/css2?family=Space+Mono&display=swap" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/css2?family=Bungee+Inline&display=swap" rel="stylesheet"/> 
      <link rel='icon' href='https://i.imgur.com/UzRCIoK.png'></link>
      {props.location.pathname !== '/'? <Nav/> : null}
      {routes}
      </header>
      </div>

  );
}


export default withRouter(App)
