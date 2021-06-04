module.exports = (topicDB) => {
  const express = require("express");
  const router = express.Router();

  router.get('/', async (req, res) => {
    const topics = await topicDB.getTopics();
    res.json(topics); 
  });

  router.get('/topic', async (req, res) => {
    const posts = await topicDB.getPosts();
    res.json(posts);
  });

  router.post('/topic', async (req, res) => {
    const post = req.body;

    if (post && post.title && post.description) {
      const savedPost = await topicDB.CreatePost(post.title, post.description);
      res.json(savedPost);
    } else {
      res.status(400).send("Missing title and/or description");
    }

  });

  router.get('/:id', async (req, res) => {
    const topic = await topicDB.getTopic(req.params.id);
    res.json(topic);
  });

  router.get('/:id/posts', async (req, res) => {
    const post = await topicDB.getPosts(req.params.id);
    res.json(post);
  });

  router.post('/:id/comments', async (req, res) => {
    const id = req.params.id;
    const comment = req.body;

    if (id && comment && comment.comment) {
      const newComment = await topicDB.createComment(id, comment.comment);
      res.json(newComment);
    } else {
      res.status(400).send("Missing id or comment");
    }
  });

  router.post('/:id/votes/:commentId', async (req, res) => {
    const commentId = req.params.commentId;

    if (commentId) {
      await topicDB.vote(commentId, "up");
      res.status(200).send("Ok");
    } else {
      res.status(400).send("Missing commentId");
    }
  });

  return router;
}
