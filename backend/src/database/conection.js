const knex = require('knex')//importando o knex 
const configuration = require('../../knexfile') //importando a configuração do knex

const conection = knex(configuration.development) //criando a conexão e passando como parâmetro a conexão de desenvolvimento

module.exports = conection // exportando a conexão com o banco de dados