const express = require('express');
const handlers = require('../handler/authentication.handler');

const authenticationRouter = express.Router();
authenticationRouter.post('/signup', handlers.signup);
authenticationRouter.get('/login', handlers.login);
authenticationRouter.get('/validateToken', handlers.validateToken);

module.exports = {
  authenticationRouter,
};
