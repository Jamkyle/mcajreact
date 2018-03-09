import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class Progressbar extends Component{
state = { ratio : this.props.ratio }
spanPlace = null
  componentDidMount(){
    fetch('/api/progress')
      .then( res => res.json() )
      .then( res => this.setState( res ) )
  }

  componentWillReceiveProps(nextProps){
    fetch('/api/progress')
      .then( res => res.json() )
      .then( res => this.setState( res ) )
  }

  render() {
    if( this.state.nbPlace << this.state.totalPlace )
      this.spanPlace =  <span style={{color: '#949a9d'}}>Plus que { this.state.nbPlace } places !</span>
    else this.spanPlace = <span style={{color: 'red'}} >Plus disponible !</span>

    return (
      <div className='progress--container font-book' >
        <div className='progress' style={bar}>
          <div className='progress-bar' style={ { width : this.state.ratio+'%'} }></div>
        </div>
        { this.spanPlace }
      </div>
    )
  }
}

Progressbar.propTypes = {
  nbPlace : PropTypes.number
}

const bar = {
  width : '70%',
  height: '8px'
}
