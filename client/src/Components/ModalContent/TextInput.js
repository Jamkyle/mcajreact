import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import {connect} from 'react-redux'

class TextInput extends Component {
  state = { phone : '' }

  handlePhone = (e) => {
    let obj = {}
    obj['phoneNum'] = e
    this.props.sendData(obj)
  }

  render(){
    switch (this.props.typeInput) {
      case 'text-tel' :
        return (
            <PhoneInput inputClassName={'ct-s-5 font-book fs-norm '+this.props.className} className={' ct-s-5 '+this.props.className} value={this.state.phone} onChange={ phone => this.setState({phone}) } onBlur={ () => this.handlePhone(this.state.phone) }/>
        )
      default:
        return ( <div className={'TextInput font-book fs-norm ct-s-5 '+this.props.className}>
          <input
          required={ this.props.required }
          name={ this.props.name }
          onBlur={ this.props.onBlur }
          type="text"
          placeholder={ this.props.placeholder } />
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
