import React, { Component } from 'react'

class TextInput extends Component {

  render(){

    switch (this.props.typeInput) {
      case 'text-tel' :
        return (
          <div className='TextInput font-book' >
            <div className='left-add'><span>+33</span></div>
            <input
            className='add'
            name={ this.props.name }
            type="text"
            placeholder={ this.props.placeholder }
            onBlur={ this.props.onBlur } />
          </div>
        )
      default:
        return ( <div className='TextInput font-book'>
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



export default TextInput
