import React, { Component } from 'react';
// import axios from 'axios';
// import logo from './logo.svg';
import './App.css';
import Header from '../src/components/header/header.js'
import Players from '../src/components/players/players.js'
import './components/displayPlayers/displayPlayers.js'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: ''
    }
  }

  render() {
    return (
      <div>
        <Header />
        <Players />
      </div>

    );
  }
}

export default App;
