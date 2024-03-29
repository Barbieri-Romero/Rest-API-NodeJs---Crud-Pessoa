const { where } = require('sequelize');
const pessoas = require('../models/pessoaModel');

const getPessoas = async (req, res) => {
    try {
        const pessoa = await pessoas.findAll();
        res.send({...pessoa})
    } catch (error) {
        res.status(500).send(error)
    }
}

const getPessoaByCpf = async (req, res) => {
    
    try {
        console.log('get by id');
        if(!req?.params?.cpf) {
            throw Error("Pessoa não encontrada!")
        }
        const cpf = req.params.cpf;
        const cfpSemPontos = cpf.replace(/[.-]/g,'');
        const pessoa = await pessoas.findOne({where: {cpf: cfpSemPontos}})
        res.send({...pessoa})
    } catch (error) {
        res.status(500).send(error)
    }
}

const deletePessoa = async (req, res) => {
    
    try {
        if(!req?.params?.id){
            throw Error("Id não informado!")
        }
        const pessoa = await pessoas.destroy({where: {id: req?.params?.id}})
        res.send({...pessoa})
    } catch (error) {
        res.status(500).send(error)
    }
}

const createPessoa = async (req, res) => {

    try { 
        if (!req.body.hasOwnProperty('cpf')) {
            res.status(403).send({error: "CPF não informado."})
            return;
        }
        const cpf = req.body.cpf;       
        const cfpSemPontos = cpf.replace(/[.-]/g,'');
        if (cfpSemPontos.length < 11) {
            res.status(403).send({error: "CPF inválido."})
            return; 
        }
        const existsPessoa = await pessoas.findOne({where: {cpf: cfpSemPontos}})
        if(existsPessoa?.dataValues?.id){
            console.log('pessoa ja existe');
            res.status(403).send({error: "Essa pessoa já existe."})
            return;
        }
        if (req.body.hasOwnProperty('telefone')) {
            const telefone = req.body.telefone;
            const telefoneApenasNumeros = telefone.replace(/[-()]/g, '');
            req.body.telefone = telefoneApenasNumeros;
        }
        req.body.cpf = cfpSemPontos;
        const pessoa = await pessoas.create({...req.body})
        res.send({...pessoa})
    } catch (error) {
        res.status(500).send(error)
    }
}

const editPessoa = async (req, res) => {
    try {
        if(!req?.params?.id){
            res.status(403).send({error: "Id não informado."})
                return; 
        }
        if (req.body.hasOwnProperty('cpf')) {
            const cpf = req.body.cpf;       
            const cfpSemPontos = cpf.replace(/[.-]/g,'');
            if (cfpSemPontos.length < 11) {
                res.status(403).send({error: "CPF inválido."})
                return; 
            } 
            req.body.cpf = cfpSemPontos; 
        }
        if (req.body.hasOwnProperty('telefone')) {
            const telefone = req.body.telefone;
            const telefoneApenasNumeros = telefone.replace(/[-()]/g, '');
            req.body.telefone = telefoneApenasNumeros;
        }
        const pessoa = await pessoas.update({...req.body},{where: {id: req.params.id}})
        res.send({...pessoa})
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {getPessoas, getPessoaByCpf, createPessoa, editPessoa, deletePessoa}