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
import mapboxgl from 'mapbox-gl';
import { mapboxAPI } from '../service/mapboxService'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'

class TabForm extends Component{
  flexDirection = { flexDirection: 'row' }
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
    if( this.state.price !== '...'  )
      {this.props.sendData({ price : this.state.price })
      this.props.modalOpen()}
  }

componentWillReceiveProps(nextProps){

  if(nextProps.tabActive !== this.props.tabActive)
    if(nextProps.tabActive === 0){
      this.setState({ price : formules() })
      this.props.sendData({ depart:'Aeroport Orly', arrive: 'Aeroport Orly', coordinatesdepart:undefined, coordinatesarrive: undefined })
    }

  if (nextProps.tabActive === 1) {
    this.setState({ price : '...' })
    if(nextProps.DataForm.coordinatesdepart !== undefined && nextProps.DataForm.coordinatesarrive !== undefined && typeof nextProps.DataForm.arrive === 'string' && typeof nextProps.DataForm.depart === 'string' ){

      var coordinates = `${nextProps.DataForm.coordinatesdepart.join()};${nextProps.DataForm.coordinatesarrive.join()}`
      fetch(mapboxAPI.endPoint + coordinates + '?access_token=' + mapboxAPI.accessToken)
      .then( res => res.json())
      .then( res => {
        let distance = res.routes[0].distance / 1000
        let duration = res.routes[0].duration / 60
        let prix = Math.round( distance*1.52 + duration * 0.34 ).toFixed(2)
        this.setState({ price : prix});
      } )


      // this.direction.route({
      //   origin: nextProps.DataForm.depart,
      //   destination: nextProps.DataForm.arrive,
      //   provideRouteAlternatives: false,
      //   travelMode: 'DRIVING',
      // }, data => {
      //   if (data.status === 'OK'){
      //     let distance = data.routes[0].legs[0].distance.value / 1000
      //     let duration = data.routes[0].legs[0].duration.value / 60
      //     let prix = Math.round( distance*1.52 + duration * 0.34 ).toFixed(2)
      //     this.setState({ price : prix});
      //     // console.log(duration+ 'min '+ distance +'km ')
      //   }
      // })
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
  const { button, arrive, depart } = this.refs
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
    // posX : el.offsetLeft - el.scrollLeft + el.clientLeft,
    // posY: el.offsetTop - el.scrollTop + el.clientTop,
    size : el.clientWidth
  }

  if(this.state.changePos){
    rotate = 360;
    this.flexDirection = {flexDirection: 'row-reverse'}
    swapSens = ['arrive','depart'];
    setTimeout( () => this.setState({textOrly : 'right'}) , 50) // evite les bug render
  }else {
    rotate = 0;
    this.flexDirection = { flexDirection: 'row' }
    swapSens = ['depart','arrive'];
    setTimeout( () => this.setState({textOrly : ''}) , 50)// evite les bug render
  }

  this.setState({ changePos: !this.state.changePos, rota : rotate, sens : swapSens})
}

  renderOrly = (sens, posArrive, orly, textOrly) => {
    return (<div
      className='destination form-item'
      name={ sens[1] }
      ref='arrive'
      style={{ textAlign : textOrly }}>
      <img className='orly' src={ orly } alt='plane-icon'/>
      <span> AÉROPORT </span><span className='font-black'>ORLY</span>
    </div>)
  }

  renderSelect = ( type, name, ref, options, img, styles, value ) => {
    const { posDepart, posArrive, sens } = this.state
    return (<div className='formSelect form-item' ref='arrive' style={{  }}>
      <SelectForm
        type= { 'text' }
        name={ sens[1] }
        ref={ 'Value'+sens[1] }
        options={[""]}
        img={ position }
        styleclass = {'fc-white'}
        value={ this.handleValue } />
    </div>)
  }

  renderTab = ( tab ) => {
    const { posDepart, posArrive, textOrly, sens, price, rota } = this.state
    if (tab === 1)
      return (<div className='formSelect form-item' ref='arrive' style={{ transform: `translate(${posArrive.x}px, ${posArrive.y}px)` }}>
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
      className='destination form-item'
      name={ sens[1] }
      ref='arrive'
      style={{  textAlign : textOrly }}>
      <img className='orly' src={ orly } alt='plane-icon'/>
      <span> AÉROPORT </span><span className='font-black'>ORLY</span>
    </div>)
  }


  render(){
    const { textOrly, sens, price, rota } = this.state
    let blockArrive, type = 'select'
    if ( this.props.tabActive === 1 ) {
      type= 'text'
      // blockArrive = this.renderTab(this.props.tabActive)
    }
    else {
      type = 'select'
      // blockArrive = this.renderTab(this.props.tabActive)
    }
      return (
        <div className='container__bottom__inner' ref='formcontainer'>
          <div className='swipe_container' style={ this.flexDirection }>
            <div className='formSelect form-item' ref={ 'depart' } style={{ }}>
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
                className = 'swipe-button'
                ref='button'
                text={ <Icon type="swap" /> }
                action={ this.changeSens }
                opt='sens'
                type='circle'
                rota={ rota }
                onClick={ this.props.action } />
              { this.renderTab(this.props.tabActive) }
          </div>

            <Buttons
                action={ this.getValidation }
                text={ price }
                opt="price"
                className='round-droit font-black'
            />
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
