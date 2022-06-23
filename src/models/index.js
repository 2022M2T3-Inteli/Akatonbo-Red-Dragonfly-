'use strict';

// Arquivo de configuração dos models, usados para gerenciar as tabelas do banco de dados
const fs = require('fs'); // Importa o módulo de arquivos do sistema
const path = require('path'); // Importa o módulo de caminhos do sistema
const Sequelize = require('sequelize'); // Importa o módulo de Sequelize (ORM)
const basename = path.basename(__filename); // Pega o nome do arquivo atual
const env = process.env.NODE_ENV || 'development'; // Define o ambiente
const config = require(__dirname + '/../config/config.json')[env]; // Importa o arquivo de configuração do banco de dados (JSON)
const db = {}; // Cria um objeto para armazenar os models

let sequelize; // Cria uma variável para armazenar o objeto de conexão com o banco de dados

// Verifica se o banco de dados está em modo de desenvolvimento ou produção
// Cria o objeto de conexão com o banco de dados
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else { // Caso não, define o banco de dados e a senha
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname) // Lê o diretório atual
  .filter((file) => { // Filtra os arquivos
    return (
      // Verifica se o arquivo não é o atual e se o arquivo termina com .js
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => { // Para cada arquivo encontrado, importa o model respectivo
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model; // Armazena o model importado no objeto 'db'
  });

Object.keys(db).forEach((modelName) => { // Para cada model armazenado no objeto 'db', verifica se existe uma função de associação
  if (db[modelName].associate) { // Verifica se o model possui um método 'associate'
    db[modelName].associate(db); // Chama o método 'associate' do model
  }
});

db.sequelize = sequelize; // Armazena o objeto de conexão com o banco de dados no objeto 'db'
db.Sequelize = Sequelize; // Armazena o objeto de Sequelize no objeto 'db'

module.exports = db; // Exporta o objeto 'db'
