module.exports = (postDB) => {
  const express = require("express");
  const router = express.Router();

  /**** Routes ****/
  router.get('/', async (req, res) => {
    const posts = await postDB.getPosts();
    res.json(posts);
  });

  router.get('/', async (req, res) => {
    const post = req.body;

    if (post && post.title && post.description) {
      const savedPost = await postDB.createPost(post.title, post.description);
      res.json(savedPost);
    } else {
      res.status(400).send("Missing title and/or description");
    }
  });

  router.get('/:id', async (req, res) => {
    const post = await postDB.getPost(req.params.id);
    res.json(post);
  });

  router.post('/:id/comments', async (req, res) => {
    const id = req.params.id;
    const comment = req.body;

    if (id && comment && comment.comment) {
      const newComment = await postDB.createComment(id, comment.comment);
      res.json(newComment);
    } else {
      res.status(400).send("Missing id or comment");
    }    
  });

  router.post('/:id/votes/:commentId', async (req, res) => {
    const commentId = req.params.commentId;

    if (commentId) {
      await postDB.vote(commentId, "up");
      res.status(200).send("Ok");
    } else {
      res.status(400).send("Missing commentId");
    }
  });


  return router;
}
