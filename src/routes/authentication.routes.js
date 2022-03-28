const express = require('express');
const handlers = require('../handler/authentication.handler');

const authenticationRouter = express.Router();
authenticationRouter.post('/login', handlers.login);
module.exports = {
  authenticationRouter,
};
