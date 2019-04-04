const generateFact = require('./generatefact')

module.exports = (db, data, price) => {

  var ref = db.ref("/Courses");

  ref.push({...data, price : parseInt(price/100)});
  generateFact({...data, price : parseInt(price/100)})
}
