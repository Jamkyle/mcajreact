import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { auth, firebase } from '../Module/Firebase';


class Modal extends Component {
  componentDidMount(){
    if ( this.props.option === 'auth' && this.props.show ) {
      firebase.ui.start('#googleSignIn', auth.uiConfig);
    }
  }
  render(){
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }
    return (
      <div className="backdrop"  style={backdropStyle}>
      <div style={ backdropStyle } onClick={ this.props.onClose }></div>
        <div className="modal" style={modalStyle} >
          { this.props.children }
            <span className='modal--close pointer hidden' onClick={this.props.onClose}>
              x
            </span>
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
};

// The modal "window"
const modalStyle = {
  position: 'relative',
  backgroundColor: '#f7f7f7',
  zIndex: 3,
  borderRadius: 2
};

Modal.proptypes = {
  show : PropTypes.boolean,
  option: PropTypes.string
}

export default Modal
