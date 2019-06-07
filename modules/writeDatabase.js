const generateFact = require('./generatefact')
const db = require('./firebase').database()
module.exports = (data, price, id) => {
  console.log('customer id: '+id);
  var ref = db.ref("/Courses"); // db firebase
  // regroupe les info de la charge
  ref.push( {...data, customerId : id,  price : parseFloat(price/100)} );
  generateFact( {...data, price : parseFloat(price/100)} )
}
