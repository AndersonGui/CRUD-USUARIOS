'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Usuario', {
      IdUsuario: {
        type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true
      },
      Nome: {
        type: Sequelize.STRING, allowNull: false
      },
      Sobrenome: {
        type: Sequelize.STRING, allowNull: false
      },
      Email: {
        type: Sequelize.STRING, unique: true, allowNull: false
      },
      Cpf: {
        type: Sequelize.STRING(11), allowNull: false,
      },
      Telefone: {
        type: Sequelize.STRING
      },
      DataNascimento: {
        type: Sequelize.DATE, allowNull: false
      },
      Status: {
        type: Sequelize.ENUM("Ativo", "Inativo"), defaultValue: "Ativo", allowNull: false
      }
    }, {
      timestamps: false,
      tableName: 'Usuario'
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.dropTable('Usuario');
  }
};
