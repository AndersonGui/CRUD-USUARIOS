const { checkSchema } = require('express-validator/check');

module.exports.CadastrarUsuarios = (req) => {
    req.check('Nome','Campo Nome é obrigatório').isString();
    req.check('Sobrenome','Sobrenome é obrigatório.').isString();
    req.check('Email','Formato de email inválido.').isEmail();
    req.check('Cpf','Formato de email inválido.').isString();    
    req.check('DataNascimento','Formato de data inválido.');
    req.check('Status','Status deve ser Ativo ou Inativo').isIn(['Ativo','Inativo']);

    return req.validationErrors();
};

module.exports.PesquisarUsuario = (req) => {         
    req.check('Email','Formato de email inválido.').optional().isString();   
    req.check('Status','Status deve ser Ativo ou Inativo').optional().isIn(['Ativo','Inativo','Todos']);

    return req.validationErrors();
};

module.exports.PesquisarUsuarioById = (req) => {           
    req.check('IdUsuario','Erro de validação');       
    return req.validationErrors();
};

module.exports.RemoverUsuario = (req) => {         
    req.check('IdUsuario','IdUsuario é obrigatório');
    req.check('Email','Formato de email inválido.').isString().isEmail();       

    return req.validationErrors();
};

module.exports.AtualizarUsuario = (req) => {
    req.check('IdUsuario','Campo IdUsuario é obrigatório');
    req.check('Nome','Campo Nome é obrigatório').isString();
    req.check('Sobrenome','Sobrenome é obrigatório.').isString();
    req.check('Email','Formato de email inválido.').isEmail();
    req.check('Cpf','Formato de email inválido.').isString();    
    req.check('DataNascimento','Formato de data inválido.');
    req.check('Status','Status deve ser Ativo ou Inativo').isIn(['Ativo','Inativo']);

    return req.validationErrors();
};