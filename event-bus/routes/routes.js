const express = require ('express');
const axios = require ('axios');

const route = express.Router ();

const events = [];

route.post ('/events', (req, res) => {
  const event = req.body;

  events.push (event);

  axios.post ('http://posts-clusterip-srv:4000/events', event);
  axios.post ('http://comments-srv:4001/events', event);
  axios.post ('http://query-srv:4002/events', event);
  axios.post ('http://moderation-srv:4003/events', event);

  res.send ({success: true, message: 'OK'});
});

route.get ('/events', (req, res) => {
  res.send (events);
});

module.exports = route;
