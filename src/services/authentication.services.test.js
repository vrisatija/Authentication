const {
  login,
} = require('./authentication.services');
const models = require('../../models');

describe('login function', () => {
  it('should return login sucessful', async () => {
    const loginDetails = {
      username: 'vriti',
      password: 'vriti',
    };
    jest.spyOn(models.authentications, 'findAll').mockResolvedValue([loginDetails]);
    const credentials = await login(loginDetails);
    expect(credentials).toEqual('login successful');
  });
  it('should throw an error with status code 401 if details are not in login database', async () => {
    try {
      jest.spyOn(models.authentications, 'findAll').mockResolvedValue([]);
      await login({ username: 'vriti', password: 'vriti' });
    } catch (err) {
      expect(err.message).toEqual('BAD REQUEST - Wrong credentials entered');
      expect(err.code).toEqual(401);
    }
  });
  it('should throw an error with status code 400 if details are not in login database', async () => {
    try {
      jest.spyOn(models.authentications, 'findAll').mockResolvedValue([]);
      await login({ loginDetails: 'hi' });
    } catch (err) {
      expect(err.message).toEqual('BAD REQUEST - Wrong body parameters');
      expect(err.code).toEqual(400);
    }
  });
});
