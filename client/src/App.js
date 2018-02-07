import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    state = { message : ""}

  getMessage = () => {
    fetch('/api/hello')
      .then( res => res.json() )
      .then( message => this.setState( message ) );
  }

  render() {
    const {message} = this.state
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{message}</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button
              className="more"
              onClick={this.getMessage}>
              Get Message
            </button>
      </div>
    );
  }
}

export default App;
