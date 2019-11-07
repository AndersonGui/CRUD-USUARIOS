'use strict';
const crudusuarios = angular.module("crudusuarios", ["ngRoute", "ngMask"]);

crudusuarios.config(function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider
        .when('/', {
            templateUrl: 'views/usuario/index.html',
            controller: "UsuarioController"
        })
        .when('/CadastrarUsuario/', {
            templateUrl: 'views/usuario/cadastrar.html',
            controller: "UsuarioController"
        })
        .when('/CadastrarUsuario/:id', {
            templateUrl: 'views/usuario/cadastrar.html',
            controller: "UsuarioController"
        })
        .otherwise({
            redirectTo: '/'
        });
});


crudusuarios.controller('UsuarioController', function usuarioController($scope, $http, $routeParams, $location) {
    if ($routeParams.id != null) {
        $scope.modoEdicao = true;
        $scope.EmailConfirmacao = "";
        $scope.IdUsuario = parseFloat($routeParams.id);

        let dataJson = JSON.stringify({ IdUsuario: $scope.IdUsuario });

        $http({
            method: 'POST',
            url: 'api/usuario/PesquisarUsuarioById',
            data: dataJson
        }).then((res) => {
            $scope.Usuario = res.data.Dados;
            $scope.Usuario.DataNascimento = new Date($scope.Usuario.DataNascimento);
        }).catch((error) => {
            bootbox.alert('Error: ' + error.data.Mensagem);
        });
    } else {
        $scope.Usuario = { Status: "Ativo" };
    }

    $scope.usuarios = [];
    $scope.Filtro = { Status: "Todos" };

    $scope.carregarTodosUsuarios = function () {
        $http({
            method: 'GET',
            url: '/api/usuario/BuscarTodosUsuarios'
        }).then((res) => {
            $scope.usuarios = res.data.Dados;
            $scope.montarGrid();
        }).catch((error) => {
            bootbox.alert('Error: ' + error.data.Mensagem);
        });
    }

    $scope.changeView = function (path) {
        $location.path(path);
    }

    $scope.salvarUsuario = function () {
        let usuarioCopy = JSON.parse(JSON.stringify($scope.Usuario));

        usuarioCopy.Cpf = usuarioCopy.Cpf.replace(/\./g, "").replace(/\-/g, "");

        let dataJson = JSON.stringify(usuarioCopy);

        $http({
            method: 'POST',
            url: $scope.modoEdicao ? 'api/usuario/AtualizarUsuario' : 'api/usuario/CadastrarUsuario',
            data: dataJson
        }).then((res) => {
            if ($scope.modoEdicao) {
                bootbox.alert("Usuário foi atualizado com sucesso!");
            } else {
                bootbox.alert("Usuário foi cadastrado com sucesso!");
            }
            $location.path('/');
        }).catch((error) => {
            bootbox.alert('Error: ' + error.data.Mensagem);
        });
    }

    $scope.deletarUsuario = function (id) {
        let dataJson = JSON.stringify({ IdUsuario: id, Email: $scope.EmailConfirmacao });
        $http({
            method: 'POST',
            url: 'api/usuario/RemoverUsuario',
            data: dataJson
        }).then((res) => {
            bootbox.alert("Usuário foi deletado com sucesso!");
            $scope.carregarTodosUsuarios();
        }).catch((error) => {
            bootbox.alert('Error: ' + error.data.Mensagem);
        });
    }

    $scope.pesquisarUsuarios = function (id) {
        let dataJson = JSON.stringify({ Status: $scope.Filtro.Status, Email: $scope.Filtro.Email });
        $http({
            method: 'POST',
            url: 'api/usuario/PesquisarUsuario',
            data: dataJson
        }).then((res) => {
            $scope.usuarios = res.data.Dados;
            $scope.montarGrid();
        }).catch((error) => {
            bootbox.alert('Error: ' + error.data.Mensagem);
        });
    }

    $scope.montarGrid = function () {
        $("#gridusuarios").jsGrid({
            width: "100%",
            inserting: false,
            editing: false,
            sorting: false,
            paging: false,

            data: $scope.usuarios,

            fields: [
                { name: "Nome", width: 40, type: "text", title: "Nome" },
                { name: "Sobrenome", width: 50, type: "text", title: "Sobrenome" },
                { name: "Email", width: 90, type: "text", title: "Email" },
                {
                    type: "text", width: 50, title: "CPF", editButton: false, deleteButton: false,
                    itemTemplate: function (value, item) {

                        let cpf = `${item.Cpf.slice(0, 3)}.${item.Cpf.slice(3, 6)}.${item.Cpf.slice(6, 9)}-${item.Cpf.slice(9, 11)}`

                        return cpf;
                    }
                },
                {
                    type: "text", width: 45, title: "Data Nascimento", editButton: false, deleteButton: false,
                    itemTemplate: function (value, item) {
                        return new Date(item.DataNascimento).toLocaleDateString();
                    }
                },
                { name: "Telefone", width: 50, type: "text", title: "Telefone" },
                {
                    type: "text", width: 40, title: "Status", editButton: false, deleteButton: false,
                    itemTemplate: function (value, item) {
                        return item.Status == 'Ativo' ? 'ATIVO' : 'INATIVO';
                    }
                },
                {
                    type: "control", width: 30, editButton: false, deleteButton: false,
                    itemTemplate: function (value, item) {
                        jsGrid.fields.control.prototype.itemTemplate.apply(this, arguments);

                        const $botaoEditar = $("<i style='color:#00b9ff; margin-right:2%'  class='far fa-1x fa-edit'></i>")
                            .click(function (e) {
                                $scope.$apply(function () {
                                    $location.path('/CadastrarUsuario/' + item.IdUsuario);
                                });

                                e.stopPropagation();
                            });

                        const $botaoDeletar = $("<i style='color:red' class='fas fa-1x fa-trash-alt'></i>")
                            .click(function (e) {
                                bootbox.prompt({
                                    title: "Confirme o email do usuário " + item.Nome,
                                    inputType: 'email',
                                    callback: function (email) {
                                        if (email == null) return;
                                        $scope.EmailConfirmacao = email;
                                        $scope.deletarUsuario(item.IdUsuario);
                                    }
                                });

                                e.stopPropagation();
                            });

                        return $("<div>").append($botaoEditar).append($botaoDeletar);
                    }
                },
            ]
        });
    }

    if (!$scope.modoEdicao) {
        $scope.carregarTodosUsuarios();
    }

});

crudusuarios.controller('LayoutController', function layoutController($scope, $http, $location) {
    $scope.changeView = function (path) {
        $location.path(path);
    }

});