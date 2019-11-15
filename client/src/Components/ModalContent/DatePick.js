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

  state = {  }

  componentWillMount() {
    let time
    time = moment()
    if(moment().get('hour') > 22 || moment().get('hour') < 6){
      (moment().get('hour') > 22) && time.add(1, 'days')
      time = moment().set({'hour': 6})
    }else {
      time = moment().add(1, 'hour')
    }

    // console.log(this.props.value.date);
    this.props.value.hour !== undefined && this.props.value.date !== undefined ?
    this.setState({ date: moment(this.props.value.date), hours: time.set({'hour': this.props.value.hour.split(':')[0], 'minute': this.props.value.hour.split(':')[1]}) })
    : this.setState({ date: time, hours : time.add(30 - moment().minute() % 30 , "minutes") })
  }

  componentDidMount = () => {
    let obj = {}
    obj = {
      dateFormatLString : this.refs.date.props.selected.locale('fr').format('dddd LL'),
      date : this.refs.date.props.selected.format("YYYY/MM/DD"),
      hours : this.refs.hours.state.inputValue
    }
    this.props.sendData({...obj})
  }

  componentWillUpdate = ( nextProps, nextState ) => {

    // console.log(val);
    // let date = moment().set({ 'year': val.split('/')[0] , 'month': val.split('/')[1], 'date': val.split('/')[2] })
    if(nextProps.value !== this.props.value) {
        let val = nextProps.value
        this.setState({ date: moment(val.date), hours: moment().set('hour', val.hour.split(':')[0]) })
      }
  }

  onSelect = (date, id) => {
    let obj = {}
    let aDate
    id === 'hours' ? aDate = this.state.date : aDate = date
    obj = {
      dateFormatLString : aDate.locale('fr').format('dddd LL'),
      date : aDate.format("YYYY/MM/DD"),
      hours : this.refs.hours.state.inputValue
    }

    this.props.sendData({...obj})

    this.setState({ date : aDate })
  }
  render(){
    var locale = window.navigator.userLanguage || window.navigator.language;
    console.log(this.state.hours.hours());
    return (
      <div className='ct-h ct-s-7'>
        <DatePicker
          className='cl-l-1 Date'
          customInput={<CustomInput />}
          ref='date'
          dateFormat = { this.props.lang.form.formatDate }
          selected = { this.state.date }
          onSelect = { this.onSelect }
          minDate={ moment().hour() < 22 ? moment() : moment().add(1, 'day')}
          maxDate={ moment().add( 2, "months" ).subtract( moment().date(), 'days' ) }
        />
        <DateTime local='fr-fr'
          ref='hours'
          className='ct-s-3 Date'
          dateFormat={false}
          timeFormat= "HH:mm"
          timeConstraints	= { { hours: { min: 6, max: 22, step: 2 } ,minutes : { step : 15 } } }
          onChange = { val => this.onSelect( val, 'hours' ) }
          defaultValue = { this.state.hours }
          inputProps={ { placeholder: "Choix de l'heure", className:'font-book fs-norm-g ant-input ct-s-1 datepicker' } }
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
