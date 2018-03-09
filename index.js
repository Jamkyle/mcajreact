const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
var nbCars = 2


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let totalPlace = 4 * nbCars
let current = 0
let places = [1,2,3,4]


// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/ASK_PLACES', (req, res)=>{
  places = fillSelect()
  res.json({ selPlaces : places })
});
app.post('/api/SEND_DATA', (req, res) => {
  current = current + parseInt(req.body.place)
  current > totalPlace ? current = 0 : current = current
  value = ( current / totalPlace ) * 100

    res.json({ ratio : value, nbPlace : placeRest(current, totalPlace), selPlaces : fillSelect() })
});
app.get('/api/hello', (req,res)=>{
  res.json({ message:'hello world!' })
});
app.get('/api/progress', (req, res) => {
  value = ( current / totalPlace ) * 100
  res.json({ ratio : value, nbPlace : placeRest(current, totalPlace), totalPlace : totalPlace })
});

function fillSelect(){
  places = []
  if ( placeRest(current, totalPlace) > 4 )
    places = [1,2,3,4]
  else{
    for (i = 0; i < placeRest(current, totalPlace) ; i++)
      places.push( i + 1 );
  }
  if(placeRest(current, totalPlace) === 0 )
    places = [0]
  return places
}

function placeRest( current, totalPlace ){
  return totalPlace - current
}

// Put all API endpoints under '/api'
// app.get('/api/passwords', (req, res) => {
//   const count = 5;
//
//   // Generate some passwords
//   const passwords = Array.from(Array(count).keys()).map(i =>
//     generatePassword(12, false)
//   )
//
//   // Return them as json
//   res.json(passwords);
//
//   console.log(`Sent ${count} passwords`);
// });

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`listening on ${port}`);
