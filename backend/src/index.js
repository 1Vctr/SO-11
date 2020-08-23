//importando modulos

//----------------------------------------------------------------------//

const express = require("express")
const cors = require('cors') //Segurança da aplicação/criptografia 
const routes = require('./routes') //importando as Rotas da aplicação

//----------------------------------------------------------------------//

const app = express(); //instanciando o express

app.use(cors()) //Limitando o acesso ao código da aplicação
app.use(express.json()); //Uso de json na resposta das rotas
app.use(routes); //Usando o modulo de rotas


app.listen(8080)