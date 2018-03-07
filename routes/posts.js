let store = require('./store.js')

const createNewPost = (postId, author, title, content) => {
  let newPost = {
    metadata: {
      relativeUrl: "/post/" + postId,
      author: author,
      publishDate: new Date(),
      edited: false
    },
    title: title,
    content: content,
    comments: []
  };

  return newPost;
};

const updatePost = (post, author, title, content) => {
  post.metadata.author = author;
  post.metadata.publishDate = new Date();
  post.metadata.edited = true;
  post.title = title;
  post.content = content;
}

module.exports = {
  getPosts(req, res) {
    return res.status(200).send({posts: store.posts});
  },
  addPost(req, res) {
    let postId = store.posts.length;
    let newPost = createNewPost(postId, req.headers.xauthor, req.body.title, req.body.content);
    store.posts.push(newPost);
    return res.status(201).send({post: newPost});
  },
  updatePost(req, res) {
    let post = store.posts[req.params.postId];
    updatePost(post, req.headers.xauthor, req.body.title, req.body.content);
    return res.status(200).send({post: store.posts[req.params.postId]});
  },
  removePost(req, res) {
    store.posts.splice(req.params.postId, 1);
    return res.sendStatus(204);
  }
};
