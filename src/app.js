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

// Esse pacote é necessário para enviar requisições PATCH e DELETE nos forms
var methodOverride = require('method-override');

var app = express(); // instancia do express

// Inicialização do Sequelize (ORM para manipular o Banco de Dados)
const db = require('./models');

db.sequelize
  .sync({ force: false }) // Se true, apaga o banco de dados quando qualquer código é alterado
  .then(() => console.log('Conectado ao banco de dados'));

// Permite acesso externo
app.use(cors());
// Desativa o X-Powered-By: Express
app.disable('x-powered-by');

// setup da view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// sobrecarregar requisições POST que tem ?_method=DELETE ou ?_method=PATCH
// esse pacote é necessário para enviar requisições PATCH e DELETE nos forms
app.use(methodOverride('_method'));

app.use(logger('dev')); // logar requisições para o console
app.use(express.json()); // receber o corpo (body) de requisições em formato JSON
app.use(express.urlencoded({ extended: false })); // para parse de querystrings -- false, usa a biblioteca 'querystring', true, usa a biblioteca 'qs'
app.use(cookieParser()); // ler cookies
app.use(express.static(path.join(__dirname, 'public'))); // arquivos estáticos

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
