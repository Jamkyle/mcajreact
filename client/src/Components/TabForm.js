import React, {Component} from 'react'
import position from '../styles/assets/img/Forme 1.png'
import carret from '../styles/assets/img/carret.png'
import orly from '../styles/assets/img/orly.png'
import arrows from '../styles/assets/img/arrows-sens.png'
import Buttons from './Buttons'

class TabForm extends Component{
  state = {
   value: '',
   depart:0,
   arrive:0,
   changePos : true,
   rota: 0,
  }

getValidationState = () => {
 const length = this.state.value.length;
 if (length > 10) return 'success';
 else if (length > 5) return 'warning';
 else if (length > 0) return 'error';
 return null;
}

handleChange = (e) => {
 this.setState({ value: e.target.value });
}

changeSens = () => {
  const {formcontainer, button, depart, arrive} = this.refs
  const { sens } = button.refs
  let arrivePos, departPos, rotate
  if(this.state.changePos){
    arrivePos = - ( depart.clientWidth + formcontainer.clientWidth*0.08 + sens.clientWidth);
    departPos = -arrivePos
    rotate = 360
  }else {
    arrivePos = 0;
    departPos = 0;
    rotate = 0
  }
  this.setState({ arrive: arrivePos, depart : departPos, changePos: !this.state.changePos, rota : rotate })
}
  render(){
      const {depart, arrive, changePos} = this.state
      console.log(arrive);
    if (this.props.tabActive === 1) {
      return (
        <div className='container__bottom__inner' ref='formcontainer'>
        <div className='formSelect' key='depart' ref='depart' style={{ transform: 'translateX('+depart+'px)' }}>
          <img src={ position }/>
          <select>
            <option value='1'>Point de départ</option>
            <option value='2'>Gare de Lyon</option>
            <option value='3'>Montparnasse</option>
          </select>
        </div>
          <Buttons ref='button' text={ <img className='sens' src={arrows}/> } action={ this.changeSens } type='round' rota={this.state.rota} onClick={ this.props.action }/>
          <div className='formSelect' key='arrive' ref='arrive' style={{ transform: 'translateX('+arrive+'px)' }}>
            <img src={ position }/>
            <select>
              <option value='1'>{"Point d'arrivé"} </option>
              <option value='2'>Gare de Lyon</option>
              <option value='3'>Montparnasse</option>
            </select>
          </div>
          <Buttons text="12,50€" action={ this.props.modalOpen } type='round-droit price'/>
        </div>
      )
    }
    else {
      return (
        <div className='container__bottom__inner' ref='formcontainer'>
          <div className='formSelect' ref='depart' style={{ transform: 'translateX('+depart+'px)' }}>
            <img src={ position }/>
            <select>
              <option value='1'>Denfert Rochereaux</option>
              <option value='2'>Gare de Lyon</option>
              <option value='3'>Montparnasse</option>
            </select>
          </div>
          <Buttons ref='button' text={ <img className='sens' src={arrows}/> } action={ this.changeSens } type={'round'} rota={this.state.rota} onClick={ this.props.action }/>
          <div className='destination' ref='arrive' style={{ transform: 'translateX('+ arrive +'px)' }}>
            <img className='orly' src={orly}/>
            <span > AÉROPORT <span className='font-book'>ORLY</span></span>
          </div>
          <Buttons text="12,50€" action={ this.props.modalOpen } type='round-droit price'/>
        </div>
      )
    }

  }
}

export default TabForm;
