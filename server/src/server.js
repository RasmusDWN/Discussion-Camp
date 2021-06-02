/**** Node.js libraries *****/
const path = require('path');

/**** External libraries ****/
const express = require('express'); 
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

/**** Configuration ****/
const app = express(); 
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/disccamp';

async function createServer() {

  await mongoose.connect(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});

  const topicDB = require("./topicDB")(mongoose);
  const userDB = require("./userDB")(mongoose);
  await topicDB.bootstrap();

  // Require Routes
  const routes = require("./routes")();

  app.use(bodyParser.json()); 
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(morgan('combined')); 
  app.use(cors());
  app.use(express.static(path.resolve('..', 'client', 'build'))); 
  
  /**** Add routes ****/
  app.use("/api", routes);

  // "Redirect" all non-API GET requests to React's entry point (index.html)
  app.get('*', (req, res) =>
    res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
  );
  
  return app;
}

module.exports = createServer;