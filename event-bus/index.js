const express = require('express');
const route = require('./routes/routes');

const app = express();
app.use(express.json());
app.use('/', route);

app.get('/', (req, res) => {
  res.send('Welcome to event-bus');
});

app.listen(4005, () => {
  console.log('Listening to port 4005');
});
