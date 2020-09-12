const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', async (req, res) => {
  const {type, data} = await req.body;
  if (type === 'PostCreated') {
    const {id, title} = data;
    console.log(id, title);

    posts[id] = {id, title, comments: []};
  }
  if (type === 'CommentCreated') {
    const {id, content, postId} = data;
    console.log(id, content, postId);
    const post = posts[postId];
    post.comments.push({id, content});
  }
  console.log(posts);
  res.send({success: true});
});

app.listen(4002, () => {
  console.log('Listening 4002');
});
