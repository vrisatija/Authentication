// const { default: Redis } = require('ioredis');
const utils = require('../utils/token.utils');
const redis = require('../utils/redis.utils');
const models = require('../../models');
const { CustomException } = require('../../constants/error');

const signup = async (credentials) => {
  await models.authentications.create({
    username: credentials.name,
    password: credentials.pass,
  });
};
const login = async (credentials) => {
  if (!credentials.username || !credentials.password) {
    throw CustomException('BAD REQUEST - Wrong body parameters', 400);
  }
  const auth = await models.authentications.findAll({
    attributes: ['username', 'password'],
    where: {
      username: credentials.username,
      password: credentials.password,
    },

  });
  if (Object.keys(auth).length !== 0) {
    // return 'login successful';
    const token = utils.createToken(credentials.username);
    redis.setKey(token, credentials.username);
    return token;
  }
  throw CustomException('BAD REQUEST - Wrong credentials entered', 401);
};
const validateToken = (token) => {
  const user = redis.getValue(token);
  return user;
};
module.exports = {
  login,
  signup,
  validateToken,
};
