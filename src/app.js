require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// arquivos de rotas
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var employeesRouter = require('./routes/employees');
var projectsRouter = require('./routes/projects');
var rolesRouter = require('./routes/roles');
var assignmentsRouter = require('./routes/assignments');
var departmentsRouter = require('./routes/departments');
var locationsRouter = require('./routes/locations');
var dashboardRouter = require('./routes/dashboard');

var app = express();

// Inicialização do Sequelize (Banco de Dados)
const db = require('./models');

db.sequelize
  // Se houver qualquer alteração no código, limpar o banco de dados
  .sync({ force: false })
  .then(() => console.log('Conectado ao banco de dados'));

// Permite acesso externo
app.use(cors());
// Desativa o X-Powered-By: Express
app.disable('x-powered-by');

// setup da view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// rotas
app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/employees', employeesRouter);
app.use('/projects', projectsRouter);
app.use('/roles', rolesRouter);
app.use('/assignments', assignmentsRouter);
app.use('/locations', locationsRouter);
app.use('/departments', departmentsRouter);
app.use('/dashboard', dashboardRouter);

// pegar erros 404 e tratar
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // setar locals, somente em ambiente de desenvolvimento
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // renderizar pagina de erro
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
