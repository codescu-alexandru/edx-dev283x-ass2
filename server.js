const express = require('express');
const logging = require('morgan');
const errorHandler = require('errorhandler');
const bodyParser = require('body-parser');
const routes = require('./routes/index.js');
const { check, validationResult } = require('express-validator/check');

const app = express();
app.use(logging('dev'));
app.use(errorHandler());
app.use(bodyParser.json());
app.use((req, res, next) => {
  if (req.headers.xauthor) return next();
  return res.sendStatus(403);
});

app.get('/posts', (req, res) => {
  return routes.posts.getPosts(req, res);
});
app.post('/posts',
  [check('title').exists().isLength({ min: 1 }), check('content').exists().isLength({ min: 1 })],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }
    return routes.posts.addPost(req, res);
});
app.put('/posts/:postId',
  [check('title').exists().isLength({ min: 1 }), check('content').exists().isLength({ min: 1 })],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }
    return routes.posts.updatePost(req, res);
});
app.delete('/posts/:postId', (req, res) => {
  return routes.posts.removePost(req, res);
});

app.get('/posts/:postId/comments', (req, res) => {
  return routes.comments.getComments(req, res);
});
app.post('/posts/:postId/comments',
  [check('comment').exists().isLength({ min: 1 })],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }
    return routes.comments.addComment(req, res);
});
app.put('/posts/:postId/comments/:commentId',
  [check('comment').exists().isLength({ min: 1 })],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }
    return routes.comments.updateComment(req, res);
});
app.delete('/posts/:postId/comments/:commentId', (req, res) => {
  return routes.comments.removeComment(req, res);
});

console.log('Listening on http://localhost:3003');
app.listen(3003);
