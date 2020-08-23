const conection = require('../database/conection')

module.exports = { //exportando as funcionalidades de incident
    
    async index(req,res){  //Mostra todos os incidents ( um index )

        const { page = 1 } = req.query // definindo páginação 

        const [count] = await conection('incidents').count() //Armazenando o Número de incidents 
        const incidents = await conection('incidents')
        .join(  //relacionando dados de 2 tabelas
            'ongs', //trazendo dados da tabela de ongs
            'ongs.id', '=', 'incidents.ong_id'
            //pegando apenas o id da tabela de ongs onde o id da ong é igual ao id do incident
            )
        .limit(5)                       //definindo limite de incidents por page
        .offset( (page-1) * 5 )
        .select([                     //Dados que vão ser mostrados
            'incidents.*', //todos os dados de incidents
            'ongs.name', //selecionando dados especificos da ong para n sobrepor o ID
            'ongs.email', 
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf'
        ])

        res.header('X-Total-Count', count['count(*)']) //mostrando o número de incidents no header

        return res.json(incidents) //retornando os incidents em formato json
    },

    async create(req, res){ //Criando incident
        const { title, description, value} = req.body //pegando titulo, desc e valor pelo corpo da requisição
        const ong_id = req.headers.authorization;

        const [id] = await conection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return res.json({ id })
    },

    async delete(req, res){ //deletando incident
        const { id } = req.params; //pegando os parâmetros 
        const ong_id = req.headers.authorization;

        const incident = await conection('incidents') //pegando o incident
        .where('id', id)
        .select('ong_id')
        .first()

        if (incident.ong_id != ong_id){ //se o id do incident n pertence ao da ong q qr deletar...
            return res.status(401).json({error: 'Operation not permited.'})
        }

        await conection('incidents').where('id', id).delete(); //deletando do banco de dados
        
        return res.status(204).send();
    }
}