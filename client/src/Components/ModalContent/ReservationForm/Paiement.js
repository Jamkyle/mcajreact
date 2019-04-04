import React from 'react'
import {Elements} from 'react-stripe-elements';

import InjectedCheckoutForm from '../Stripe/CheckoutForm';

const Paiement = (props) => {
  console.log(props);
  //A faire coté server
  let date = props.DataForm.dateFormatLString.split(' ')
  var price = props.DataForm.price.replace(',','.')
  if (props.tabActive === 0) {
    let prixInt = (props.DataForm.price).replace(',','.')
    let placesInt = props.DataForm.place
    let rabat = (1.1-(placesInt/10))
    placesInt >> 3 ? rabat = 0.7 : null
    price = prixInt * placesInt * rabat
    // console.log(prixInt +' '+placesInt+' '+rabat);
  }

  return (
    <div>
      <div className='font-book font-color--darkbluer10'>
        <p>{ date[0].charAt(0).toUpperCase()+ date[0].substr(1) } <span style={Style.blueText}>{' '+date[1]+' '+date[2]+' '}</span>{date[3]}, <span style={Style.blueText}>{props.DataForm.hours}</span>, <span style={Style.blueText}>{props.DataForm.place}</span> { props.DataForm.place > 1 ? 'places' : 'place' }</p>
        <p>Montant de la transaction <span style={Style.blueText}> { parseFloat(price).toFixed(2)+'€' } </span></p>
      </div>
      <Elements>
        <InjectedCheckoutForm {...props}/>
      </Elements>
    </div>
  )
}

const Style = {
  blueText : { color : "#99cbf1", fontFamily: 'Circular Air-Black', letterSpacing : '0.02em' }
}
export default Paiement
