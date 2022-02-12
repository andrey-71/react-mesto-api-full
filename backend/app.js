const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const routes = require('./routes');
const { PORT, DB_ADDRESS } = require('./utils/config');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-handler');
const { signupValidation, signinValidation } = require('./middlewares/joi-validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
// Подключение к БД
mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
});

// CORS
const corsOptions = {
  origin: [
    'https://mesto-frontend.andrey-g.nomoredomains.xyz',
    'http://mesto-frontend.andrey-g.nomoredomains.xyz',
    'http://localhost:3001',
  ],
  credentials: true,
};
app.use(cors(corsOptions));

// Сборка данных в JSON-формат
app.use(bodyParser.json());
// Парсер кук
app.use(cookieParser());
// Логгер запросов
app.use(requestLogger);

// Роуты регистрации и авторизации (незащищенные)
app.post('/signup', signupValidation, createUser);
app.post('/signin', signinValidation, login);
// Мидлвэр авторизации
app.use(auth);
// Остальные роуты (защищенные)
app.use(routes);

// Логгер ошибок
app.use(errorLogger);
// Обработчик ошибок celebrate
app.use(errors());
// Обработчик ошибок
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
