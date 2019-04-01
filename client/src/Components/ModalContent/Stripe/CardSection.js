import React from 'react';
import {CardElement} from 'react-stripe-elements';

class CardSection extends React.Component {
  render() {
    return (
      <label>
        Card details
        <CardElement className={'font-book'} style={{base: {fontSize: '14px', color:'#354b5d'}} } />
      </label>
    );
  }
}

export default CardSection;
