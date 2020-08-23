const crypto = require('crypto')
const conection = require('../database/conection');

module.exports = {
    
    async index(req, res){ //listando as ongs existentes
        const ongs = await conection('ongs').select('*')
        return res.json(ongs)
    },

    async create(req, res){ //criando ongs 
        const { name, email, whatsapp, city, uf } = req.body; //pega os dados correspondentes pelo corpo da requisição
    
        const id = crypto.randomBytes(4).toString('HEX') //cria um id

        await conection('ongs').insert({ //inserindo dados na tabela
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return res.json({ id }) //retornando ID da ong
    }
}