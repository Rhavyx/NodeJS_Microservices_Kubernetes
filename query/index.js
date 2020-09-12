const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
  if (type === 'PostCreated') {
    const {id, title} = data;
    console.log(id, title);

    posts[id] = {id, title, comments: []};
  }
  if (type === 'CommentCreated') {
    const {id, content, postId, status} = data;

    console.log(id, content, postId, status);

    const post = posts[postId];
    post.comments.push({id, content, status});
  }

  if (type === 'CommentUpdated') {
    const {id, content, postId, status} = data;

    const post = posts[postId];
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });

    comment.status = status;
    comment.content = content;
  }
};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', async (req, res) => {
  const {type, data} = await req.body;

  handleEvent(type, data);

  res.send({success: true});
});

app.listen(4002, async () => {
  console.log('Listening 4002');

  const res = await axios.get('http://localhost:4005/events');
  for (let event of res.data) {
    console.log('Processando evento:', event.type);
    handleEvent(event.type, event.data);
  }
});
