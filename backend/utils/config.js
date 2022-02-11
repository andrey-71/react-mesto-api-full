const {
  PORT = 3001,
  DB_ADDRESS = 'mongodb://localhost:27017/mestodb',
} = process.env;

module.exports = { PORT, DB_ADDRESS };
