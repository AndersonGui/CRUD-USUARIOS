##Descrições básicas
Api feita com NodeJs utilizando Express.

Utilizei o express-generator para criar o projeto.

##Banco de Dados
MySql
Acesso ao banco de dados(Caso necessária alterar as chaves de acesso, alterar o arquivo database.js localizado na pasta "config")
user: root
password: root

##Pacotes adicionados:
express-validator
mysql2
sequelize
sequelize-cli

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

#Iniciar o projeto
npm install;

sequelize db:migrate;

sequelize db:seed:all;