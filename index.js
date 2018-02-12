const express = require('express');
const path = require('path');

const app = express();
let current = 0

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/add', (req, res)=>{
    current < 4 ? current = current + 1 : current = 0;
    res.json({ ratio : current/4*100, nbPlace : current })
    console.log('you are adding something '+current);
})

app.get('/api/hello', (req,res)=>{
  res.json({message:'hello world!'})
});

app.get('/api/progress', (req, res) => {
  let value
  value = current/4*100
  res.json({ ratio : value, nbPlace : current })
});

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
