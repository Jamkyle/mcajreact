import React, { Component } from 'react'
import PropTypes from 'prop-types'
class TextInput extends Component {

  render(){

    switch (this.props.typeInput) {
      case 'text-tel' :
        return (
          <div className={'TextInput font-book fs-norm ct-s-5 '+this.props.className} >
            <div className='left-add'><span>+33</span></div>
            <input
            className='add'
            name={ this.props.name }
            type="tel"
            placeholder={ this.props.placeholder }
            pattern=".?[0-9] ([0-9]{2} ?){4}"
            onBlur={ this.props.onBlur } />
          </div>
        )
      default:
        return ( <div className={'TextInput font-book fs-norm ct-s-5 '+this.props.className}>
          <input
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


export default TextInput
