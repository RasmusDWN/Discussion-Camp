module.exports = () => {
  const express = require("express");
  const router = express.Router();

  /**** Routes ****/
  router.get('/disccamp', async (req, res) => {
    res.json({msg: "Welcome!"});
  });

  router.get('/disccamp/:name', async (req, res) => {
    res.json({msg: `Hello, ${req.params.name}`});
  });

  return router;
}
