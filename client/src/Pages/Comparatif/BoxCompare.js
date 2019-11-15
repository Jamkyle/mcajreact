import React from 'react'
import { connect } from 'react-redux'

export class BoxCompare extends React.Component {

  state = { display: 'flex'}
  componentDidMount(){
    this.topBox = this.box.getBoundingClientRect()
    if( window.scrollY > window.innerHeight - ( this.topBox.height * 2.333 ) ) this.anime = 'anime'
  }

  componentWillUpdate(){
    if( window.scrollY > window.innerHeight - ( this.topBox.height * 2.333 ) ) this.anime = 'anime'
  }

  render(){
    const  { props } = this

    return (
      <section style={ {...this.state, opacity : 0 } } style={{ animationDelay: `${props.delay}ms` }} className={ `${props.className} ${this.anime} bg BoxCompare ${props.bg}` } ref={ ref => this.box = ref }>
        <div className='BoxCompare--container'>
          <div className='BoxCompare--img'>
            { props.src }
          </div>
          <div className='BoxCompare--details'>
            <h1 className='BoxCompare--title'>
              { props.prix }
            </h1>
            <ul>
              { props.details.map( (item, i) => {
                  return <li key={ i }> { item } </li>
                })
              }
            </ul>
          </div>
        </div>
      </section>
    )
  }

}
