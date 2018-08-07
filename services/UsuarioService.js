const Sequelize = require('sequelize');
const Op = Sequelize.Op;

var Usuario = require('../models/Usuario');

class UsuarioService {
    static async BuscarTodosUsuarios(){
        try{
            let usuarios = await Usuario.findAll();    
            return usuarios;
        }catch(error){
            throw error;
        }
    }

    static async BuscarUsuarioById(usuarioVm){
        try{
            let usuario = await Usuario.findOne({where: {IdUsuario : usuarioVm.IdUsuario}})
            return usuario;
        }catch(error){
            throw error;
        }
    }

    static async CadastrarUsuario(usuarioVm){
        try{
            let usuarioExistente = await Usuario.findOne({where: {Email : usuarioVm.Email}})
            if(usuarioExistente != null) throw new Error("Email já cadastrado no sistema.");

            usuarioVm.Email = usuarioVm.Email.toLowerCase()
            usuarioVm.Status = usuarioVm.Status.toLowerCase()

            let usuario = await Usuario.create(usuarioVm); 
            return usuario;            
        }catch(error){
            throw error;
        }
    }

    static async PesquisarUsuario(filtro){
        try{
            let condicao = {};

            if(filtro.Email){
                condicao.Email = { [Op.like] : `%${filtro.Email.toLowerCase()}%`}
            }
            if(filtro.Status){
                if(filtro.Status != "Todos"){
                    condicao.Status = filtro.Status
                }                                
            }            
            
            let usuarios = await Usuario.findAll({
                where : condicao
            });    

            return usuarios;
        }catch(error){
            throw error;
        }
    }    

    static async RemoverUsuario(removerUsuarioVm){
        try{
            let usuario = await Usuario.findOne({where: {IdUsuario : removerUsuarioVm.IdUsuario, Email: removerUsuarioVm.Email}})
            if(!usuario) throw new Error("Não foi possivel remover o usuário");

            await Usuario.destroy({where : {IdUsuario : removerUsuarioVm.IdUsuario}})
            return;            
        }catch(error){
            throw error;
        }
    }

    static async DesativarUsuario(desativarUsuarioVm){
        try{
            let usuario = await Usuario.findOne({where: {IdUsuario : desativarUsuarioVm.IdUsuario, Email: desativarUsuarioVm.Email}})
            if(!usuario) throw new Error("Não foi possivel remover o usuário");

            let usuarioAtualizado = await Usuario.update({Status: 'Inativo'},{where : {IdUsuario : desativarUsuarioVm.IdUsuario}})
            return;            
        }catch(error){
            throw error;
        }
    }

    static async AtualizarUsuario(usuarioVm){
        try{
            let usuario = await Usuario.findOne({where: {IdUsuario : usuarioVm.IdUsuario, Email: usuarioVm.Email}})
            if(!usuario) throw new Error("Não foi possivel atualizar o usuario");
            
            usuarioVm.Email = usuarioVm.Email.toLowerCase()
            usuarioVm.Status = usuarioVm.Status.toLowerCase()

            let usuarioAtualizado = await Usuario.update(
                {
                    Nome: usuarioVm.Nome,
                    Sobrenome: usuarioVm.Sobrenome,
                    Cpf: usuarioVm.Cpf,
                    DataNascimento: usuarioVm.DataNascimento,
                    Status: usuarioVm.Status,
                    Telefone: usuarioVm.Telefone
                },                                                                
                { where : {
                    IdUsuario : usuarioVm.IdUsuario,
                    Email: usuarioVm.Email
                    }
                })
            return usuarioAtualizado;
        }catch(error){
            throw error;
        }
    }
}

module.exports = UsuarioService;