import React, { Component } from 'react';
import Toppage from './Pages/Toppage'


class App extends Component {

  // getMessage = () => {
  //   fetch('/api/hello')
  //     .then( res => res.json() )
  //     .then( message => this.setState( message ) );
  // }

  render() {
    return (
      <div className="App page">
        <Toppage />
      </div>
    );
  }
}

export default App;
