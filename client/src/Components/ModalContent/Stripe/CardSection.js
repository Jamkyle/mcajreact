import React from 'react';
import {CardElement} from 'react-stripe-elements';

class CardSection extends React.Component {
  render() {
    return (
      <label>
        <label style={{ fontWeight : 700, fontSize: '17px' }} > Informations sur votre carte </label>
        <CardElement className={'font-book Card'} style={{base: {fontSize: '14px', color:'#354b5d'}} } />
      </label>
    );
  }
}

export default CardSection;
