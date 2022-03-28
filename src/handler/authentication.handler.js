const services = require('../services/authentication.services');

const login = async (req, res) => {
  try {
    const auth = await services.login(req.body);
    res.json({
      auth,
    }).status(200);
  } catch (err) {
    res.status(err.code).json({ error: `There's something wrong!  Failed: \n Error: ${err.message}` });
  }
};
module.exports = {
  login,
};
