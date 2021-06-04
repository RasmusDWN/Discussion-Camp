module.exports = (topicDB) => {
  const express = require("express");
  const auth = require("../middleware/auth");
  const router = express.Router();

  router.get('/', async (req, res) => {
    const topics = await topicDB.getTopics();
    res.json(topics); 
  });

  router.get('/:id', async (req, res) => {
    const topic = await topicDB.getTopic(req.params.id);
    res.json(topic);
  });

  router.post('/:id', async (req, res) => {
    const post = req.body.post;
    const username = "myUsename";
    const topicId = req.params.id;

    if (post && post.title && post.description && username) {
      
      const savedPost = await topicDB.createPost(topicId, post.title, post.description, username);
      res.json(savedPost);
    } else {
      res.status(400).send("Missing title and/or description");
    }

  });

  router.get('/posts/:id', async (req, res) => {
    const postId = req.params.id;
    const post = await topicDB.getPost(req.params.id);
    res.json(post);
  });

  router.post('/posts/:id/comments', async (req, res) => {
    const postId = req.params.id;
    const comment = req.body;

    if (id && comment && comment.comment) {
      const newComment = await topicDB.createComment(postId, comment.comment);
      res.json(newComment);
    } else {
      res.status(400).send("Missing id or comment");
    }
  });

  return router;
}
