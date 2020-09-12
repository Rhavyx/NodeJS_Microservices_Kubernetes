const express = require('express');
const axios = require('axios');

const route = express.Router();

route.post('/events', (req, res) => {
  const event = req.body;

  axios.post('http://localhost:4000/events', event);
  axios.post('http://localhost:4001/events', event);
  axios.post('http://localhost:4002/events', event);
  axios.post('http://localhost:4003/events', event);

  res.send({success: true, message: 'OK'});
});

module.exports = route;
