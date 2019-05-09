import React,{ Component } from 'react'
import { connect } from 'react-redux'
import Profil from './ReservationForm/Profil'
import Paiement from './ReservationForm/Paiement'
import Response from './ReservationForm/Response'

// import {injectStripe} from 'react-stripe-elements';


class ReservationForm extends Component{
  state = { selPlaces : [1], step : 0}

  componentDidMount(){
    console.log(this.props);
    fetch( '/api/ASK_PLACES')
    .then(res => res.json())
    .then(res => {
      this.setState( res );
    });
  }

  toStep = (ev) => {
    console.log('next');
    this.setState({ step : this.state.step + ev })

  }



  onSubmit = () =>{

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
    // if ( e.target.getAttribute('name') === 'phoneNum' ) {
    //   value = '+33' + value
    // }
    obj[e.target.getAttribute('name')] = value
    this.setState({ data : {...this.state.data , ...obj} })

  }

  render(){
    const { selPlaces } =  this.state
    const { DataForm, lang } = this.props
    let form = [<Profil selPlaces={selPlaces} data={{...DataForm, ...this.state.data}} getData={this.getData} onSubmit={ ()=> this.toStep(1) } tabActive={this.props.tabActive}/>, <Paiement {...this.props} {...this.state} action={ () => this.toStep(1) }/>, <Response {...this.props} {...this.state}  />]
    return(
      <div>
        <span style={{float : 'left', cursor: 'pointer'}} onClick={ ()=> this.toStep(-1) } >{this.state.step === 1 && ' < retour '}</span>
        <div className='Modal--Title font-bold '> Je réserve... </div>
        <p className='font-bold font-color--darkblue fs-xl'>
          <span>{ DataForm.depart+" " }</span><span style={{ color : "#82898d", fontFamily: 'Circular Air-Book' }}>{ lang.form.select.arrive }</span><span>{ DataForm.arrive }</span>
        </p>
        {
          form[this.state.step]
        }
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
