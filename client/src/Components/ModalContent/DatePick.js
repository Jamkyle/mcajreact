import React, {Component} from 'react'
import { connect } from 'react-redux'
import DateTime from 'react-datetime'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datetime/css/react-datetime.css';

class DatePick extends Component{
  state = { date : moment() }

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
    return (
      <div>
      <DatePicker
        ref='date'
        dateFormat = { this.props.lang.form.formatDate }
        selected = { this.state.date }
        onSelect = { this.onSelect }
        minDate={ this.state.date }
        maxDate={moment().add(2, "months")}
      />
      <DateTime local='fr-fr'
        ref='hours'
        dateFormat={false}
        timeFormat= "HH:mm"
        timeConstraints	= { { minutes : { step : 15 } } }
        onChange = { this.onSelect }
        defaultValue = { moment().add(30 - moment().minute() % 30 , "minutes") }
        inputProps={{ placeholder: "Choix de l'heure" }}
      />
      </div>
    )
  }
}

export default connect(
  state => (state),
  dispatch => ({
    sendData : ( val ) => dispatch({type : 'SEND_FORM_DATA', data : val })
  })
)(DatePick)
