import React, {Component} from 'react'
import { connect } from 'react-redux'
import DateTime from 'react-datetime'
import moment from 'moment'
import PropTypes from 'prop-types'
import 'moment/locale/fr'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datetime/css/react-datetime.css';
import CustomInput from './CustomInput'
import TextInput from './TextInput'


class DatePick extends Component{

  state = { date : moment() }

  componentDidMount = () => {
    let obj = {}
    obj = {
      dateFormatLString : this.refs.date.props.selected.locale('fr').format('dddd LL'),
      date : this.refs.date.props.selected.format("YYYY/MM/DD"),
      hours : this.refs.hours.state.inputValue
    }
    this.props.sendData({...obj})
  }

  onSelect = (date) => {
    let obj = {}
    obj = {
      date : this.refs.date.props.selected.format("YYYY/MM/DD"),
      hours : this.refs.hours.state.inputValue
    }
    this.props.sendData({...obj})
    this.setState({ date })
  }
  render(){
    var locale = window.navigator.userLanguage || window.navigator.language;
    return (
      <div className='ct-h ct-s-7'>
        <DatePicker
          className='cl-l-1'
          customInput={<CustomInput />}
          ref='date'
          dateFormat = { this.props.lang.form.formatDate }
          selected = { this.state.date }
          onSelect = { this.onSelect }
          minDate={ moment() }
          maxDate={ moment().add(2, "months") }
        />
        <DateTime local='fr-fr'
          ref='hours'
          className='ct-s-3 cl-r-1  '
          dateFormat={false}
          timeFormat= "HH:mm"
          timeConstraints	= { { minutes : { step : 15 } } }
          onChange = { this.onSelect }
          defaultValue = { moment().add(30 - moment().minute() % 30 , "minutes") }
          inputProps={{ placeholder: "Choix de l'heure", className:'font-book fs-norm-g ant-input ct-s-1 datepicker' }}
        />
      </div>
    )
  }
}
const Style = {
  DatePick : {
    width : '50px'
  },
  DateTime : {
    width : '50px'
  }
}

export default connect(
  state => (state),
  dispatch => ({
    sendData : ( val ) => dispatch({type : 'SEND_FORM_DATA', data : val })
  })
)(DatePick)
