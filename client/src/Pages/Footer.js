import React, { Component } from 'react'
import footerData from './footer.json'

export const Footer = (props) => {
  return (<footer className='footer'>
          <div className="container">
          { Object.entries(footerData.informations).map( ( el, k ) => {
            return (
            <div key={'ul'+el[0]}>
              <h2 className='font-black'>{ el[0] }</h2>
              <ul className='content--column'>
                { el[1].map((e, i) => <li key={'footerli'+i}><a href={e.lien}> {e.text} </a></li>) }
              </ul>
            </div>
          )
          })
          }
          </div>
          <p><span className='copyright'>Copyright © 2016 </span>{footerData.copyright}</p>
        </footer>
  )
}
