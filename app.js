const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const compression = require('compression');
const express = require('express');
const logger = require('morgan');
const path = require('path');
require('dotenv').config();


// Rota para a documentação do Swagger
const app = express();

app.use(compression({
  level: 7, // Nível de compressão (padrão é 6) max 9
  threshold: 0, // Compressão para todas as respostas
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      // Não comprime se este cabeçalho está presente
      return false;
    }
    // Padrão de compressão
    return compression.filter(req, res);
  }
}));

// view engine setup
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', express.static(path.resolve('src','public','css')));
app.use('/', express.static(path.resolve('src','public','js')));
app.use('/', express.static(path.resolve('src','public','assets')));

//Rotas
const page = require('./src/routes/pages/pages');
const authRouter = require('./src/routes/api/authRouter');
const redistradorRouter = require('./src/routes/api/registradorRouter');
const pessoaRouter = require('./src/routes/api/pessoaRouter');

app.use('/', page);
app.use('/auth', authRouter);
app.use('/registrador', redistradorRouter);
app.use('/pessoa', pessoaRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
