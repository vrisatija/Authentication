const Redis = require('ioredis');

const redis = new Redis();

redis.set('mykey', 'value');
const setKey = (key, value) => {
  console.log('set');
  redis.set(key, value, 'EX', 360);
  console.log('set2');
};
const getValue = (key) => redis.get(key);
module.exports = {
  setKey,
  getValue,
};
