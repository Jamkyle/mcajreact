import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Input} from 'antd'

class CustomInput extends Component{
  render(){
    // <div className='TextInput font-book' style={{width:'60%', display:'inline-flex'}}>
    // <input
    // className='fs-norm-g'
    // style={{textAlign:'center'}}
    // onClick={this.props.onClick}
    // readOnly
    // value={this.props.value}
    // placeholder={ this.props.value } />
    return(

        <Input
          className='fs-norm-g font-book datepicker'
          style={{textAlign:'center', maxWidth:'100px'}}
          onClick={this.props.onClick}
          value={this.props.value}
          readOnly
       />
    )
  }
}
CustomInput.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string
};

export default CustomInput
