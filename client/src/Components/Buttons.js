import React, {Component} from 'react'


class Buttons extends Component{

  render(){
    return(
      <span ref='sens' className={"button "+this.props.type} onClick={ this.props.action } style={{ transform: 'rotate('+this.props.rota+'deg)'}}>
        {this.props.text}
      </span>
    )
  }
}

export default Buttons
