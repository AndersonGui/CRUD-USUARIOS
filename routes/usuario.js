const express = require('express');
const router = express.Router();
const usuarioService = require('../services/UsuarioService');
const reqvalidations = require('./validations/requestvalidation');

router.get('/BuscarTodosUsuarios', function(req, res, next) {
  (async ()=> {
    try {      
      let usuarios = await usuarioService.BuscarTodosUsuarios();
      res.send({Dados:usuarios, Erro: false});
      return;

    } catch (error) {
      res.status(500).send({ Erro: true, Mensagem: error.message})
      return;
    }
  })();
});

router.post('/CadastrarUsuario', function(req, res, next) {      
  (async ()=> {    
    try {   
      var errosValidacao = reqvalidations.CadastrarUsuarios(req)

      if(errosValidacao) {
        let erros = []

        errosValidacao.forEach(function(err) {
          erros.push(err.msg);
        });
        
        res.status(400).send({ Erro: true, Mensagem: "Foram encontrados erros de validação", Erros: erros });
        return;
      }
             
      let usuarioCriado = await usuarioService.CadastrarUsuario(req.body);
      res.send({Dados:usuarioCriado, Erro: false});
      return 

    } catch (error) {
      res.status(500).send({ Erro: true, Mensagem: error.message})
      return;
    }
  })();
});

router.post('/PesquisarUsuario', function(req, res, next) {      
  (async ()=> {     
    try {   
      var errosValidacao = reqvalidations.PesquisarUsuario(req)

      if(errosValidacao) {
        let erros = []

        errosValidacao.forEach(function(err) {
          erros.push(err.msg);
        });
        
        res.status(400).send({ Erro: true, Mensagem: "Foram encontrados erros de validação", Erros: erros });
        return;
      }
             
      let usuarios = await usuarioService.PesquisarUsuario(req.body);
      res.send({Dados:usuarios, Erro: false});
      return 

    } catch (error) {
      res.status(500).send({ Erro: true, Mensagem: error.message})
      return;
    }
  })();
});

router.post('/PesquisarUsuarioById', function(req, res, next) {      
  (async ()=> {     
    try {               
      var errosValidacao = reqvalidations.PesquisarUsuarioById(req)

      if(errosValidacao) {
        let erros = []

        errosValidacao.forEach(function(err) {
          erros.push(err.msg);
        });        
        res.status(400).send({ Erro: true, Mensagem: "Erro de validação do request"});
        return;
      }
            
      let usuario = await usuarioService.BuscarUsuarioById(req.body);
      res.send({Dados:usuario, Erro: false});
      return 

    } catch (error) {
      res.status(500).send({ Erro: true, Mensagem: error.message})
      return;
    }
  })();
});

router.post('/RemoverUsuario', function(req, res, next) {      
  (async ()=> {     
    try {   
      var errosValidacao = reqvalidations.RemoverUsuario(req)

      if(errosValidacao) {
        let erros = []

        errosValidacao.forEach(function(err) {
          erros.push(err.msg);
        });
        
        res.status(400).send({ Erro: true, Mensagem: "Foram encontrados erros de validação", Erros: erros });
        return;
      }
             
      await usuarioService.RemoverUsuario(req.body);
      res.send({Erro: false, Mensagem:'Usuário removido com sucesso'});
      return 

    } catch (error) {
      res.status(500).send({ Erro: true, Mensagem: error.message})
      return;
    }
  })();
});

router.post('/AtualizarUsuario', function(req, res, next) {      
  (async ()=> {     
    try {   
      var errosValidacao = reqvalidations.AtualizarUsuario(req)

      if(errosValidacao) {
        let erros = []

        errosValidacao.forEach(function(err) {
          erros.push(err.msg);
        });
        
        res.status(400).send({ Erro: true, Mensagem: "Foram encontrados erros de validação", Erros: erros });
        return;
      }
             
      let usuarioAtualizado = await usuarioService.AtualizarUsuario(req.body);
      res.send({Erro: false, Mensagem: "Usuário atualizado com sucesso" });
      return 

    } catch (error) {
      res.status(500).send({ Erro: true, Mensagem: error.message})
      return;
    }
  })();
});

module.exports = router;
