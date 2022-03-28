const { CustomException } = require('../../constants/error');
const services = require('../services/authentication.services');
const {
  login,
} = require('./authentication.handler');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
const mockRequest = () => {
  const req = {};
  req.body = { username: 'vriti', password: 'vriti' };
  return req;
};
describe('login function', () => {
  it('should send login status', async () => {
    //   const bankdetails = {
    //     username:"vriti",
    //     password:"vriti"
    //   };
    jest.spyOn(services, 'login').mockResolvedValue('login sucessful');
    const res = mockResponse();
    const req = mockRequest();
    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ auth: 'login sucessful' });
  });
  it('should catch error if thrown by login service', async () => {
    jest.spyOn(services, 'login').mockRejectedValue(CustomException('ERROR', 500));
    const res = mockResponse();
    const req = mockRequest();
    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'There\'s something wrong!  Failed: \n Error: ERROR' });
  });
});
