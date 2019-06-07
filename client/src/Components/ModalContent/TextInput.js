import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import {connect} from 'react-redux'

class TextInput extends Component {
  state = { phone : this.props.value, valide: 'check' }

  handlePhone = (e) => {
    let obj = {}
    if(e){
      this.setState({ valide : 'valide' })
    }else {
      this.setState({ valide : 'error' })
    }
    obj['phoneNum'] = e
    this.props.sendData(obj)
  }

  handleBlur = (e) => {
    // console.log(e.target);
    if(e.target.value !== '' || e.target.required === false)
      {
        this.setState({ valide : 'valide' })
        this.props.onBlur(e)
      }else {
        this.setState({ valide : 'error' })
      }
  }

  render(){

    switch (this.props.typeInput) {
      case 'text-tel' :
        return (
            <PhoneInput inputClassName={this.state.valide+' ct-s-7 font-book fs-norm '+this.props.className} className={' ct-s-5 '+this.props.className} value={this.state.phone} onChange={ phone => this.setState({phone}) } onBlur={ () => this.handlePhone(this.state.phone) }/>
        )
      default:
        return (
          <div className={this.state.valide +' TextInput font-book fs-norm ct-s-5 '+this.props.className } >
            <input
            required={ this.props.required }
            name={ this.props.name }
            onBlur={ this.handleBlur }
            type="text"
            placeholder={ this.props.placeholder }
            defaultValue = { this.props.value } />
          </div>
         )
    }
  }
}

TextInput.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onBlur : PropTypes.func,
  typeInput : PropTypes.string
};


export default connect(
    state => state,
    dispatch => ({
      sendData : ( val ) => dispatch({type : 'SEND_FORM_DATA', data : val })
    })
  )(TextInput)
