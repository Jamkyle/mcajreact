import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd';
import { connect } from 'react-redux'
// import GoogleMap from 'google-map-react'

const Option = Select.Option

class SelectForm extends Component{
  state = { input : '' }
  autocomplete = null
  getData = (e) => {
    let obj = {}
    obj[this.props.name] = e
    this.props.sendData({...obj})
  }

  handleValue = (e) => {
    let obj = {}
    obj[this.props.name] = e.target.value
    this.props.sendData({...obj})
  }

  componentDidMount(){
    if(this.props.type !== 'select'){
      this.autocomplete = new window.google.maps.places.Autocomplete(this.refs['select-'+this.props.name], mapOption )
      this.autocomplete.addListener('place_changed', () => this.getData(this.refs['select-'+this.props.name].value) );
    }

    let obj = {}
    this.props.name === 'place' ? obj[this.props.name] = 1 : obj[this.props.name] = this.refs['select-'+this.props.name].value
    this.props.sendData({...obj})
  }

  componentDidUpdate(nextProps){
    // if(nextProps.name === 'depart' && this.props.name === 'depart')
      if (nextProps.type !== this.props.type) {
        console.log('this.props update');
        if(this.props.type !== 'select'){
          this.autocomplete = new window.google.maps.places.Autocomplete(this.refs['select-'+this.props.name], mapOption )
          this.autocomplete.addListener('place_changed', () => this.getData(this.refs['select-'+this.props.name].value) );
        }
        let value = this.refs['select-'+this.props.name].value
        let obj = {}
        obj[this.props.name] = value
        this.props.sendData({...obj})
      }

    // if(nextProps.name === 'arrive' && this.props.name === 'arrive')
    //   if (nextProps.type !== this.props.type) {
    //     let value = this.refs['select-'+this.props.name].value
    //     let obj = {}
    //     obj[this.props.name] = value
    //     this.props.sendData({...obj})
    //   }
  }

  render(){
    const { lang } = this.props.state
    const options = this.props.options.map( (e,i) => {
      if(this.props.name === 'place') return <Option key={e+i} value={e}>{e}</Option>
      else return <option key={e+i} value={e}>{e}</option>
    })
    let input
    if(this.props.type === 'select'){
      if (this.props.name === 'place') {
        input =  <Select style={{ minWidth:50 }} defaultValue={'place'} name={ this.props.name } className="itemForm addCarret datepicker place" ref={ 'select-'+this.props.name } onChange={ this.getData }>
                  { options }
                </Select>
      }else {
        input =  <select name={ this.props.name } className="itemForm addCarret fs-norm" ref={ 'select-'+this.props.name } onChange={ this.handleValue }>
                  { options }
                </select>
      }

    }
    else {
      input = <input
        style={ Style.InputText }
        onChange = {this.getData }
        className={ "font-black itemForm fs-norm "+this.props.styleclass }
        type='text'
        ref={'select-'+this.props.name}
        name={ this.props.name }
        placeholder={ lang.form.select[this.props.name] } />
    }
    return(
      <div>
        <img src={ this.props.img } alt={ this.props.img }/>
        { input }
      </div>
    )
  }
}

SelectForm.proptypes = {
  img : PropTypes.string,
  type : PropTypes.string,
  name : PropTypes.string,
  options : PropTypes.array,
  sendData : PropTypes.func,
}

const mapOption = {
    componentRestrictions : { country : "fr" }
}

const Style = {
  InputText : { width: '80%', padding : '9px' ,border : 'none', backgroundColor : 'transparent', outline: 'none', color :'white' }
}

export default connect(
  state => ({ state }),
  dispatch => ({
    sendData : ( val ) => dispatch({type : 'SEND_FORM_DATA', data : val }),
  })
)(SelectForm)