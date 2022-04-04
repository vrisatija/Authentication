const services = require('../services/authentication.services');

const signup = async (req, res) => {
  try {
    const user = await services.login(req.body);
    res.json({
      user,
    }).status(201);
  } catch (err) {
    res.status(err.code).json({ error: `There's something wrong!  Failed: \n Error: ${err.message}` });
  }
};
const login = async (req, res) => {
  try {
    const auth = await services.login(req.body);
    res.headers.token = auth;
    res.json({
      auth,
    }).status(200);
  } catch (err) {
    res.status(err.code).json({ error: `There's something wrong!  Failed: \n Error: ${err.message}` });
  }
};
const validateToken = async (req, res) => {
  try {
    // console.log(req.headers);
    const user = await services.validateToken(req.headers.token);
    res.json({
      user,
    }).status(200);
  } catch (err) {
    res.status(err.code).json({ error: `There's something wrong!  Failed: \n Error: ${err.message}` });
  }
};
module.exports = {
  login,
  signup,
  validateToken,
};
