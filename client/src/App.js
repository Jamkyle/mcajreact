import React, { Component } from 'react';
import {connect} from 'react-redux'
import Toppage from './Pages/Toppage'
import Comparatif from './Pages/Comparatif'
import {Footer} from './Pages/Footer'


let lastScrollY = 0;
let ticking = false;

class App extends Component {
  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    lastScrollY = window.scrollY;
    this.setState({ scroll : lastScrollY });
  }

  // getMessage = () => {
  //   fetch('/api/hello')
  //     .then( res => res.json() )
  //     .then( message => this.setState( message ) );
  // }

  render() {

    return (
      <div className="App">
        <Toppage scroll={ lastScrollY }/>
        <Comparatif scroll={ lastScrollY }/>
        <Footer/>
      </div>
    );
  }
}

export default connect(
  state => (state),
  (dispatch) => ({ setScrollPos : ( e ) => dispatch({ type: 'SET_SCROLL_POS', val: e }) })
)(App);
