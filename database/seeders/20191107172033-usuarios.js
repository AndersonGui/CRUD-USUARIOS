'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Usuario', [
      {Nome: "Ânderson", Sobrenome: "Guimarães", Email: "andersogui@gmail.com", Cpf: "12345678912",Telefone: "51978945612",DataNascimento: "1992-08-02",Status: "Ativo"},
      {Nome: "Maicom", Sobrenome: "Ferreira", Email: "maicomferreira@mail.com", Cpf: "98765432198", Telefone: "null", DataNascimento: "1990-05-10",Status: "Inativo"},
      {Nome: "Felipe", Sobrenome: "Rocha", Email: "felipe@mail.com", Cpf: "56498732154", Telefone: "null", DataNascimento: "1985-03-11",Status: "Ativo"},
      {Nome: "Marcela", Sobrenome: "Reis", Email: "marcela@mail.com", Cpf: "87954621346", Telefone: "51877562432", DataNascimento: "1977-03-19",Status: "Ativo"},
      {Nome: "Jessica", Sobrenome: "Souza", Email: "jessica@mail.com", Cpf: "79546813252", Telefone: "null", DataNascimento: "2000-03-25",Status: "Inativo"}      
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Usuario', null, {});
  }
};
