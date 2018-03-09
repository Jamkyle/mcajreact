import React, {Component} from 'react'
import { Button } from 'antd'
import PropTypes from 'prop-types'

class Buttons extends Component{

  render(){
    let sup
    (this.props.opt === 'price') ?
      sup = <sup>€</sup>
    :
      sup = null

    return(
      <Button type='primary' shape={ this.props.type } onClick={ this.props.action } style={{ transform: 'rotate('+this.props.rota+'deg)' }} className={ this.props.className +' button red'} ref='sens' >
        {this.props.text}{sup}
      </Button>
    )

    // return(
    //   <div ref='sens' className={ "vr-button "+this.props.type } onClick={ this.props.action } style={{ transform: 'rotate('+this.props.rota+'deg)' }}>
    //     {this.props.text}{sup}
    //   </div>
    // )
  }
}

Buttons.proptypes = {
  text: PropTypes.string,
  type : PropTypes.string,
  action : PropTypes.function
}

export default Buttons
