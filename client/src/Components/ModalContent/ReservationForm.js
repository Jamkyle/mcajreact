import React,{ Component } from 'react'
import { connect } from 'react-redux'
import Progressbar from '../Progressbar'
import TextInput from './TextInput'
import Buttons from '../Buttons'
import SelectForm from '../SelectForm'
import DatePick from './DatePick'


class ReservationForm extends Component{
  state = { selPlaces : [1] }

  componentDidMount(){
    fetch( '/api/ASK_PLACES')
    .then(res => res.json())
    .then(res => {
      this.setState( res );
    });
  }
  onSubmit = ( ) =>{
    this.props.sendData(this.state.data)
    const params = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body : JSON.stringify(this.props.DataForm)
    }
    fetch( '/api/SEND_DATA', params )
    .then(res => res.json() )
    .then(res => {
      this.setState( res );
      // this.props.toggleModal()
    });

  }

  getData = (e) => {
    let obj = {}
    let value = e.target.value
    if ( e.target.getAttribute('name') === 'phoneNum' ) {
      value = '0' + value
    }
    obj[e.target.getAttribute('name')] = value
    this.setState({ data : {...this.state.data , ...obj} })
  }

  render(){
    const { selPlaces } =  this.state
    const { DataForm, lang } = this.props

    return(
      <div>
        <div className='Modal--Title font-bold'> Je réserve... </div>
        <p className='font-bold font-color--darkblue'>
          <span>{ DataForm.depart }</span> <span style={{ color : "#82898d", fontFamily: 'Circular Air-Book' }}>{ lang.form.select.arrive }</span> <span >{ DataForm.arrive }</span>
        </p>
        <Progressbar />
        <form >
          <DatePick />
          <SelectForm options={ selPlaces } name='place' type='select'/>
          <TextInput name='LastName' placeholder='Nom' onBlur={ this.getData }/>
          <TextInput name='FirstName' placeholder='Prénom'onBlur={ this.getData }/>
          <TextInput name='CompagnyName' placeholder='Nom de la Société (optionnel)' onBlur={ this.getData }/>
          <TextInput name='email' placeholder='Adresse de messagerie' onBlur={ this.getData }/>
          <TextInput typeInput='text-tel' name='phoneNum' placeholder='X XX XX XX XX' onBlur={ this.getData }/>
          <Buttons action={ this.onSubmit } text={ 'Valider' } className='round-droit alone'/>
        </form>
      </div>

    )
  }
}

export default connect(
    state => state,
    dispatch => ({
      sendData : ( val ) => dispatch({type : 'SEND_FORM_DATA', data : val })
    })
  )(ReservationForm)
