import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import position from '../styles/assets/img/Forme 1.png'
import orly from '../styles/assets/img/orly.png'
// import arrows from '../styles/assets/img/arrows-sens.png'
import { Icon } from 'antd'
import Buttons from './Buttons'
import SelectForm from './SelectForm'
import formules from '../Module/helpers'


class TabForm extends Component{
  state = {
   value: '',
   posDepart:0,
   posArrive:0,
   changePos : true,
   rota: 0,
   widthButton: 0,
   sens : ['depart', 'arrive'],
   data : {},
  }
  direction = null

  getValidation = () => {
    this.props.sendData({ price : this.state.price })
    this.props.modalOpen()
  }

componentWillReceiveProps(nextProps){

  if(nextProps.tabActive !== this.props.tabActive)
    if(nextProps.tabActive === 0){
      this.setState({ price : formules() })
      this.props.sendData({ depart:'Aeroport Orly', arrive: 'Aeroport Orly' })
    }

  if (nextProps.tabActive === 1) {
    this.setState({ price : '...' })
    if(nextProps.DataForm.depart !== "" && nextProps.DataForm.arrive !== "" && typeof nextProps.DataForm.arrive === 'string' && typeof nextProps.DataForm.depart === 'string' ){
      this.direction.route({
        origin: nextProps.DataForm.depart,
        destination: nextProps.DataForm.arrive,
        provideRouteAlternatives: false,
        travelMode: 'DRIVING',
      }, data => {
        if (data.status === 'OK'){
          let distance = data.routes[0].legs[0].distance.value / 1000
          let duration = data.routes[0].legs[0].duration.value / 60
          let prix = Math.round( distance*1.52 + duration * 0.34 ).toFixed(2)
          this.setState({ price : prix});
          // console.log(duration+ 'min '+ distance +'km ')
        }
      })
    }
  }


}

componentDidMount(){
  const { button } = this.refs
  const { sens } = button.refs
  this.direction = new window.google.maps.DirectionsService()
  this.setState({ widthButton: sens.clientHeight, price : formules() })
}

changeSens = () => {
  const { formcontainer, arrive } = this.refs
  // const { sens } = button.refs
  const { DataForm, sendData } = this.props
  let arrivePos, departPos, rotate, swapSens
  sendData({ depart : DataForm.arrive, arrive :DataForm.depart })

  if(this.state.changePos){
    arrivePos = - ( arrive.clientWidth + formcontainer.clientWidth*0.08 + 30 );
    departPos = - arrivePos;
    rotate = 360;
    swapSens = ['arrive','depart']
    setTimeout( () => this.setState({textOrly : 'right'}) , 50) // evite les bug render
  }else {
    arrivePos = 0;
    departPos = 0;
    rotate = 0;
    swapSens = ['depart','arrive']
    setTimeout( () => this.setState({textOrly : ''}) , 50)// evite les bug render
  }
  this.setState({ posArrive: arrivePos, posDepart : departPos, changePos: !this.state.changePos, rota : rotate, sens : swapSens})
}
  render(){
    const { posDepart, posArrive, textOrly, sens, price, rota } = this.state
    let blockArrive, type = 'select'
    if ( this.props.tabActive === 1 ) {
      type = 'text'
        blockArrive = <div className='formSelect' ref='arrive' style={{ transform: 'translateX('+posArrive+'px)' }}>
          <SelectForm
            type= { type }
            name={ sens[1] }
            ref={ 'Value'+sens[1] }
            options={[""]}
            img={ position }
            styleclass = {'fc-white'}
            value={ this.handleValue } />
        </div>
    }
    else {
      type = 'select'
      blockArrive = <div
        className='destination'
        name={sens[1]}
        ref='arrive'
        style={{ transform: 'translateX('+ posArrive +'px)', textAlign : textOrly }}>
        <img className='orly' src={ orly } alt='plane-icon'/>
        <span> AÉROPORT </span><span className='font-black'>ORLY</span>
      </div>
    }
      return (
        <div className='container__bottom__inner' ref='formcontainer'>
          <div className='formSelect' ref={'depart'} style={{ transform: 'translateX('+posDepart+'px)' }}>
            <SelectForm
              name={ sens[0] }
              type = { type }
              key='depart'
              options={["Denfert Rochereau", "Gare de Lyon", "Montparnasse"]}
              img={ position }
              value={ this.handleValue }
              styleclass = { 'fc-white' }
              ref={ 'Value'+sens[0] } />
          </div>
            <Buttons
              ref='button'
              text={ <Icon type="swap" /> }
              action={ this.changeSens }
              opt='sens'
              type='circle'
              rota={ rota }
              onClick={ this.props.action } />
            {blockArrive}
            <Buttons action={ this.getValidation } text={ price } opt="price" className='round-droit font-black'/>
        </div>
      )
    }
}

TabForm.proptypes = {
  sens : PropTypes.Array
}

export default connect(
  state => (state),
  dispatch => ({
    sendData : ( val ) => dispatch({type : 'SEND_FORM_DATA', data : val })
  })
)(TabForm);
