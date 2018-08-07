const Sequelize = require('sequelize');
const DATABASE = 'crudUsuarios';
const LOGIN = 'root';
const SENHA = '';

const sequelize = new Sequelize(DATABASE, LOGIN, SENHA, {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
  
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },        
  });

const Usuario = sequelize.define('Usuario', {
    IdUsuario: {
        type: Sequelize.INTEGER, autoIncrement: true, primaryKey:true
    },    
    Nome: {
        type: Sequelize.STRING, allowNull : false
    },
    Sobrenome: {
        type: Sequelize.STRING, allowNull : false
    },
    Email: {
        type: Sequelize.STRING, unique: true, allowNull : false
    },
    Cpf : {
        type: Sequelize.STRING(11), allowNull : false, 
    },
    Telefone : {
        type: Sequelize.STRING
    },
    DataNascimento : {
        type: Sequelize.DATE, allowNull : false
    },
    Status : {
        type: Sequelize.ENUM("Ativo","Inativo"), defaultValue: false, allowNull : false
    }
}, {
    timestamps: false
});

module.exports = Usuario;