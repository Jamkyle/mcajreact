import React from 'react';
import {connect} from 'react-redux'
import {injectStripe} from 'react-stripe-elements';
import Buttons from '../../Buttons'
// import AddressSection from './AddressSection';
import CardSection from './CardSection';
import PropTypes from 'prop-types'

class CheckoutForm extends React.Component {
  state = { disable : false}
  handleSubmitStripe = (ev) => {

    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();
    this.setState({ disable : true })
    var fname = this.props.data.FirstName
    var lname = this.props.data.LastName
    var email = this.props.data.email
    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe.createToken({ name: fname+' '+lname, email : email }).then(({token}) => {
      console.log('Received Stripe token:', token);
      fetch("/charge", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({...token , data : {...this.props.DataForm, ...this.props.data, active : this.props.tabActive } })
      })
      .then(response => {
        if (!response.ok)
          throw response;
        return response.json();
      })
      .then(output => {
        console.log("Purchase succeeded:", output);
        this.props.sendData({response: 'Votre paiement a été validé'})
        this.props.action()
        this.setState({ disable: false  })
      })
      .catch(err => {
        this.props.sendData({response: 'Err'})
        this.setState({ disable : false })
        console.log("Purchase failed:", err);
      })
    });

    // However, this line of code will do the same thing:
    //
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});

    // You can also use createSource to create Sources. See our Sources
    // documentation for more: https://stripe.com/docs/stripe-js/reference#stripe-create-source
    //
    // this.props.stripe.createSource({type: 'card', name: 'Jenny Rosen'});
  };
  render() {
    return (
      <form>
        <CardSection />
        <br/>
        <Buttons action={ this.handleSubmitStripe } disable={ this.state.disable } text={ 'Valider' } className='round-droit alone'/>
      </form>
    );
  }
}

CheckoutForm.proptypes = {
  FirstName : PropTypes.string,
  LastName : PropTypes.string
}

export default connect(
  (state) => (state),
  (props) => ({})
)(injectStripe(CheckoutForm));
