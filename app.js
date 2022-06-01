const express = require('express');
const Router = require('./routes');
const middlewares = require('./middlewares');
const cors = require('cors');

const app = express();

app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.use(cors());

app.use(Router);

app.use(middlewares.errorMiddleware);

module.exports = app;
