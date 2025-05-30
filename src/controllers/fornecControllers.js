const knex = require('../database/index.js');

module.exports ={
    async searchFornecedorAllCod(req, res){
        const result = await knex('fornecedor').orderBy('codfor');

        return res.status(200).send(result);
    },
    
    async searchFornecedorAllNome(req, res){
        const result = await knex('fornecedor').orderBy('nome');

        return res.status(200).send(result);
    },

    async create(req, res){
        const { nome  } = req.body;
        const { email  } = req.body;
        const { uf  } = req.body;
        const { password  } = req.body;
        const { level  } = req.body;

        const  dados = { 
                    'nome': nome,
                    'email': email,
                    'uf': uf, 
                    'password':password, 
                    'level':level 
                };

        await knex('fornecedor')
            .insert(dados);
        return res.status(201).send({ nome, email, uf, password, level });
    },

    async updatefor(req, res){
        const { codfor } = req.params;
        const { nome  } = req.body;
        const { email  } = req.body;
        const { uf  } = req.body;
        const { password  } = req.body;
        const { level  } = req.body;
        
        const data = {
            'nome':nome,
            'email': email,
            'uf': uf,
            'password':password,
            'level':level
        }
        await knex('fornecedor').update(data).where({codfor});
        return res.status(201).send(
                {
                    msg:'Atualização efetuada com sucesso !!!!'
                }
            );
    }

}
