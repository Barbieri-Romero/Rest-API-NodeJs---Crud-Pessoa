const {Router} = require('express');
const { getPessoas, getPessoaByCpf, createPessoa, editPessoa, deletePessoa} = require('../controllers/pessoaController');
const pessoaRoute =  Router();

pessoaRoute.get('/:cpf', getPessoaByCpf)
pessoaRoute.put('/:id', editPessoa)
pessoaRoute.delete('/:id', deletePessoa)
pessoaRoute.get('/', getPessoas)
pessoaRoute.post('/', createPessoa)

module.exports = pessoaRoute;