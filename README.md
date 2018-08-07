##Descrições básicas
Api feita com NodeJs utilizando Express.

Utilizei o express-generator para criar o projeto.

##Banco de Dados
MySql
Acesso ao banco de dados(Caso necessária alterar as chaves de acesso, alterar o arquivo "Usuario" localizado na pasta "models")
user: root
password: 


##Pacotes adicionados:
express-validator
mysql2
sequelize

##Front-end
AngularJs
Bootstrap-4
Js-Grid
BootboxJs

##Lista de Metodos
LISTA DE TODOS USUARIOS:GET
http://localhost:3000/api/usuario/BuscarTodosUsuarios

CADASTRAR USUARIO:POST
http://localhost:3000/api/usuario/CadastrarUsuario

BUSCAR USUARIO COM FILTRO:POST
http://localhost:3000/api/usuario/BuscarUsuario

REMOVER USUARIO:POST
http://localhost:3000/api/usuario/RemoverUsuario

ATUALIZAR USUARIO:POST
http://localhost:3000/api/usuario/AtualizarUsuario

##Script para o banco de dados

create database crudusuarios;

use crudusuarios;

CREATE TABLE IF NOT EXISTS `Usuarios` (
  `IdUsuario` int(10) NOT NULL AUTO_INCREMENT,
  `Nome` varchar(50) NOT NULL,
  `Sobrenome` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL UNIQUE,
  `CPF` varchar(11) NOT NULL,
  `Telefone` varchar(50),
  `DataNascimento` date NOT NULL,
  `Status` ENUM('Ativo', 'Inativo') NOT NULL,
  PRIMARY KEY (`IdUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO `Usuarios` VALUES 
(null, 'Ânderson','Guimarães','andersogui@gmail.com','12345678912','51978945612','1992-08-02','Ativo'),
(null, 'Maicom','Ferreira','maicomferreira@mail.com','98765432198',null,'1990-05-10','Inativo'),
(null, 'Felipe','Rocha','felipe@mail.com','56498732154',null,'1985-03-11','Ativo'),
(null, 'Marcela','Reis','marcela@mail.com','87954621346','51877562432','1977-03-19','Ativo'),
(null, 'Jessica','Souza','jessica@mail.com','79546813252',null,'2000-03-25','Inativo');
