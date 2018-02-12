import React, {Component} from 'react'
import Modal from '../Components/Modal'
import TabForm from '../Components/TabForm'
import SocialNetwork from '../styles/assets/svg'

class Toppage extends Component{
  state = {isOpen:false, tabActive : 0}

  toggleModal = () =>{
    // console.log('modal show'); //call from child button
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render(){
    const { tabActive } = this.state
    const tab = ['Mes formules','Mon trajet'].map( (e, i) => {
      return <li key={i} className={ tabActive === i ? 'active' : '' } onClick={ () => this.setState({ tabActive : i }) }>{e}</li>
    })

    return (
      <div className='TopPage page'>
      <div className='screen-dark page'></div>
      <div className='container'>
        <header className='container__header'>
          <div className='right'>
            <img src={SocialNetwork.facebook} alt='facebook'/>
            <img src={SocialNetwork.twitter} alt='twitter'/>
            <span>FR </span><span className='langage'>| EN</span>
          </div>
          <span className='logo'>vroom<span style={{ color :'#ff4747' }}>cab</span></span>
        </header>
        <div className='container__body'>
          <span className='sentence'>Commencez votre voyage tranquillement !</span>
          <div className='container__bottom'>
            <ul className='tabForm'>{ tab }</ul>
            <TabForm tabActive={ tabActive } modalOpen={ this.toggleModal } />
          </div>
        </div>
      </div>
      <Modal show={this.state.isOpen}
        onClose={this.toggleModal}>
      </Modal>
    </div>
    )
  }
}

export default Toppage
