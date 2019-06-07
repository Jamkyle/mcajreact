import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { VtcSVG, TaxiSVG, BusSVG, TramSVG, Vroomcab } from '../styles/assets/svg/icons-svg'
import * as icons from '../styles/assets/svg/icons-svg'
import { BoxCompare } from './Comparatif/BoxCompare'
import dataCompare from './comparatif.json'

class Comparatif extends Component {
  render(){

    return (
      <section className='Comparatif'>
      {
        Object.keys(dataCompare).map( (el, key) => {
          let ComponentSVG = icons[`${el[0].toUpperCase() + el.slice(1)}SVG`] ;
          return <BoxCompare
            key={el+key}
            src={ <ComponentSVG alt={`${el}logo`} fill='#fff' height={70} width={50}/> }
            prix={dataCompare[el].price}
            details={dataCompare[el].details}
            bg={`bg-${el}`}
          />
        })
      }

        {/*<BoxCompare
          src={<VtcSVG alt='vtclogo' color='#fff' height={70} width={50}/>}
          prix={dataCompare.vtc.price}
          details={dataCompare.vtc.details}
          bg='bg-vtc'
        />
        <BoxCompare
          src={<TaxiSVG alt='taxilogo' color='#fff' height={70} width={50}/>}
          prix='35€'
          details={['15 à 20 min','selon disponibilité']}
          bg='bg-taxi'
        />
        <BoxCompare
          src={<BusSVG alt='buslogo' fill='#fff' height={70} width={50}/>}
          prix='8€'
          details={['15 à 20 min','place assise non garantie','correspondance éloignée']}
          bg='bg-bus'
        />
        <BoxCompare
          src={<TramSVG alt='tramlogo' fill='#fff' height={70} width={50}/>}
          prix='12€'
          details={['15 à 20 min','nombreuses correspondances']}
          bg='bg-tram'
        />
        <BoxCompare
          src={<Vroomcab alt='vroomcablogo' fill='#fff' height={50} width={70}/>}
          prix='12.5€'
          details={['rdv défini','Allez direct']}
          bg='bg-vtc'
        /> */}
      </section>
    )
  }
}

export default connect(
state => ({ lang : state.lang }),
dispatch => ({
  switchLang : (e) => dispatch({ type:'CHANGE_LANGAGE', lang : e })
 })
)(Comparatif)
