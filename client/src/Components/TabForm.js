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
   posDepart:{ x:0, y: 0 },
   posArrive:{ x:0, y:0 },
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

// updateDimensions(){
//   if(window.innerWidth < 500) {
//       this.setState({ width: 450, height: 102 });
//     } else {
//       let update_width  = window.innerWidth-100;
//       let update_height = Math.round(update_width/4.4);
//       this.setState({ width: update_width, height: update_height });
//     }
// }
//
// componentDidMount() {
//     this.updateDimensions();
//     window.addEventListener("resize", this.updateDimensions.bind(this));
//   }


componentDidMount(){
  const { button } = this.refs
  const { sens } = button.refs
  this.direction = new window.google.maps.DirectionsService()
  this.setState({ widthButton: sens.clientHeight, price : formules() })
}


changeSens = (e) => {
  const { formcontainer, arrive, depart } = this.refs
  // const { sens } = button.refs
  const { DataForm, sendData } = this.props
  let arrivePosX, departPosX, arrivePosY, departPosY, rotate, swapSens
  const el = e.target
  sendData({ depart : DataForm.arrive, arrive :DataForm.depart })
  var button = {
    posX : el.offsetLeft - el.scrollLeft + el.clientLeft,
    posY: el.offsetTop - el.scrollTop + el.clientTop,
    size : el.clientWidth
  }

  if(this.state.changePos){
    arrivePosX =  - ( arrive.offsetLeft + arrive.scrollLeft + arrive.clientLeft  );
    departPosX =  - arrivePosX;
    arrivePosY = - ( 0 );
    departPosY = - arrivePosY;
    rotate = 360;
    swapSens = ['arrive','depart']
    setTimeout( () => this.setState({textOrly : 'right'}) , 50) // evite les bug render
  }else {
    arrivePosX = 0;
    departPosX = 0;
    arrivePosY = 0;
    departPosY = 0;
    rotate = 0;
    swapSens = ['depart','arrive'];
    setTimeout( () => this.setState({textOrly : ''}) , 50)// evite les bug render
  }

  this.setState({ posArrive: { x : arrivePosX, y: arrivePosY }, posDepart : { x: departPosX, y: departPosY }, changePos: !this.state.changePos, rota : rotate, sens : swapSens})
}

  renderTab = ( tab ) => {
    const { posDepart, posArrive, textOrly, sens, price, rota } = this.state
    if (tab === 1)
      return (<div className='formSelect' ref='arrive' style={{ transform: `translate(${posArrive.x}px, ${posArrive.y}px)` }}>
        <SelectForm
          type= { 'text' }
          name={ sens[1] }
          ref={ 'Value'+sens[1] }
          options={[""]}
          img={ position }
          styleclass = {'fc-white'}
          value={ this.handleValue } />
      </div>)
    else return (<div
      className='destination'
      name={ sens[1] }
      ref='arrive'
      style={{ transform: `translate(${posArrive.x}px, ${posArrive.y}px)`, textAlign : textOrly }}>
      <img className='orly' src={ orly } alt='plane-icon'/>
      <span> AÉROPORT </span><span className='font-black'>ORLY</span>
    </div>)
  }


  render(){
    const { posDepart, posArrive, textOrly, sens, price, rota } = this.state
    let blockArrive, type = 'select'
    if ( this.props.tabActive === 1 ) {
      type= 'text'
      blockArrive = this.renderTab(this.props.tabActive)
    }
    else {
      type = 'select'
      blockArrive = this.renderTab(this.props.tabActive)
    }
      return (
        <div className='container__bottom__inner' ref='formcontainer'>
          <div className='formSelect' ref={ 'depart' } style={{ transform: `translate(${posDepart.x}px, ${posDepart.y}px)` }}>
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
            { this.renderTab(this.props.tabActive) }
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
