let store = require('./store.js')

const createNewComment = (author, comment) => {
  let newComment = {
    commentDate: new Date(),
    author: author,
    comment: comment,
    edited: false
  };
  return newComment;
};

const updateComment = (comment, author, commentText) => {
  comment.commentDate = new Date();
  comment.author = author;
  comment.comment = commentText;
  comment.edited = true;
};

module.exports = {
  getComments(req, res) {
    let post = store.posts[req.params.postId];
    return res.status(200).send({comments: post.comments});
  },
  addComment(req, res) {
    let post = store.posts[req.params.postId];
    let index = post.comments.length;
    let newComment = createNewComment(req.headers.xauthor, req.body.comment);
    post.comments.push(newComment);
    return res.status(201).send({commentId: index});
  },
  updateComment(req, res) {
    let post = store.posts[req.params.postId];
    updateComment(post.comments[req.params.commentId], req.headers.xauthor, req.body.comment);
    return res.status(200).send(req.body);
  },
  removeComment(req, res) {
    let post = store.posts[req.params.postId];
    post.comments.splice(req.params.commentId, 1);
    return res.sendStatus(204);
  }
};
