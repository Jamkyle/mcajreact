import React, {Component} from 'react'
import { connect } from 'react-redux'
import Modal from '../Components/Modal'
import ReservationForm from '../Components/ModalContent/ReservationForm'
import Authpage from '../Components/ModalContent/Authpage'
import TabForm from '../Components/TabForm'
import SocialNetwork from '../styles/assets/svg'
import {Icon} from 'antd'

class Toppage extends Component{
  state = { isOpen:false, tabActive : 0, language : "fr", modal: 'resaForm' }
  toggleModal = (e) =>{
    let modal

    if( e === undefined || e.target.getAttribute('name') === null){
        modal = 'resaForm'
    }
    else{
      // console.log('modal show'); //call from child button
      modal = e.target.getAttribute('name')
    }
    this.setState({
      isOpen: !this.state.isOpen,
      modal : modal
    })
  }
  switchLang = (e) => {
    this.props.switchLang(e)
    this.setState({language : e})
  }

  render(){
    const message = 'se connecter'
    const { tabActive, language } = this.state
    const { lang } = this.props
    const tab = lang.form.tab.map( (e, i) => {
      return <li key={i} className={ tabActive === i ? 'active' : '' } onClick={ () => this.setState({ tabActive : i }) }>{e}</li>
    })
    const ModalComponent = {'resaForm' : ReservationForm, 'auth': Authpage}
    const ModalContent = ModalComponent[this.state.modal]
    return (
      <div className='TopPage page'>
      <div className='screen-dark page'></div>
      <div className='container'>
        <header className='container__header'>
          <div className='right'>
            <img src={SocialNetwork.facebook} alt='facebook'/>
            <img src={SocialNetwork.twitter} alt='twitter'/>
            <span onClick={ () => this.switchLang('fr') } className={ language !== 'fr' ? 'language':'' } >FR </span><span className={ language !== 'en' ? 'language':'' }onClick={ () => this.switchLang('en') } >| EN</span>
            {/*<span name='auth' onClick={ this.toggleModal } >  { message } <Icon type="login" /></span>*/}
          </div>
          <span className='logo'>vroom<span style={{ color :'#ff4747' }}>cab</span></span>
        </header>
        <div className='container__body'>
          <span className='sentence'>{ lang.slog }</span>
          <div className='container__bottom'>
            <ul className='tabForm'>{ tab }</ul>
            <TabForm tabActive={ tabActive } modalOpen={ this.toggleModal } />
          </div>
        </div>
      </div>
      <Modal show={ this.state.isOpen }
        option={ this.state.modal }
        onClose={ this.toggleModal }>
        <ModalContent toggleModal={ this.toggleModal } tabActive={tabActive} />
      </Modal>
    </div>
    )
  }
}
export default connect(
state => ({ lang : state.lang }),
dispatch => ({
  switchLang : (e) => dispatch({ type:'CHANGE_LANGAGE', lang : e })
 })
)(Toppage)
