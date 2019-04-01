import React, { Component } from 'react'
import { auth, firebase } from '../../Module/Firebase';
import { connect } from 'react-redux'

class Authpage extends Component{

  componentDidMount(){
    firebase.ui.start('#googleSignIn', auth.uiConfig);
  }

  render(){
    return(
    <div id='googleSignIn'>
      <div className='Modal--Title font-bold'> Je me connecte... </div>
      <div id='loader'></div>
    </div>
  )
  }
}

export default connect(
  state => state,
  dispatch => ({
    sendData : ( val ) => dispatch({type : 'GET_USER', user : val })
  })
)(Authpage)
