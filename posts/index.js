const express = require('express');
const {randomBytes} = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

//////////////////ROTAS/////////////////
app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  ///ADD ASYNC POR CAUSA DO AXIOS.POST
  const id = randomBytes(4).toString('hex');
  const {title} = req.body;
  console.log(title);

  posts[id] = {
    id,
    title,
  };

  await axios.post('http://event-bus-srv:4005/events', {
    /// ADD AWAIT PORQUE E ASYNCRONO OP
    type: 'PostCreated',
    data: {id, title},
  });

  res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
  console.log('Receive event', req.body.type);
  res.send({});
});

app.listen(4000, () => {
  console.log('v3.0');
  console.log('App Listening on 4000');
});
