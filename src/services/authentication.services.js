const models = require('../../models');
const { CustomException } = require('../../constants/error');

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
  if (Object.keys(auth).length !== 0) { return 'login successful'; }
  throw CustomException('BAD REQUEST - Wrong credentials entered', 401);
};
module.exports = {
  login,
};
