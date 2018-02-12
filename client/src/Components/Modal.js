import React, {Component} from 'react'
import Progressbar from './Progressbar'


class Modal extends Component {
  state = { ratio:0, nbPlace :0}
  add = () => {
    fetch('/add')
    .then(res => res.json())
    .then(res => {
      this.setState( res );
    });
  }
  render(){
    const {ratio, nbPlace} =  this.state
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }
    return (
      <div className="backdrop"  style={backdropStyle}>
      <div style={backdropStyle} onClick={this.props.onClose}></div>
        <div className="modal"  style={modalStyle} >
          { this.props.children }
            <span className='modal--close pointer hidden' onClick={this.props.onClose}>
              x
            </span>
          <Progressbar ratio={ratio} place={ nbPlace }/>
          <span onClick={ this.add } style={pointer}>add</span>
        </div>
      </div>
    );
  }
}
// The gray background
const backdropStyle = {
  position: 'fixed',
  zIndex: 1,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: 'rgba(109,119,127,0.4)',
  padding: 50
};
const pointer = {
  cursor:'pointer'
}
// The modal "window"
const modalStyle = {
  position: 'relative',
  backgroundColor: '#f7f7f7',
  zIndex: 3,
  borderRadius: 2,
  maxWidth: '51.6%',
  minHeight: '64.2%',
  margin: '0 auto',
  padding: 30
};

export default Modal
