import React, {Component} from 'react'

export default class Progressbar extends Component{
state = { ratio : this.props.ratio }
spanPlace = null
  componentWillMount(){
    fetch('/api/progress')
      .then( res => res.json() )
      .then( res => this.setState( res ) )
  }

  componentWillReceiveProps(nextProps){
      this.setState( {ratio : nextProps.ratio, nbPlace: nextProps.place} )
  }


  render() {
    if( 4 - this.state.nbPlace > 0)
      this.spanPlace =  <span>Plus que {4 - this.state.nbPlace} places !</span>
    else this.spanPlace = <span style={{color: 'red'}} >Plus disponible !</span>

    return (
      <div className='progress--container'>
        <div className='progress' style={bar}>
          <div className='progress-bar' style={ { width : this.state.ratio+'%'} }></div>
        </div>
        { this.spanPlace }
      </div>
    )
  }
}
const bar = {
  width : '70%',
  height: '8px'
}
