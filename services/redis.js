const { createClient } = require("redis");
const dotenv = require("dotenv");
dotenv.config();

const connect = async () => {
  const client = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
    }
  });
  await client.connect();
  return client;
};

module.exports = {
  connect,
};

