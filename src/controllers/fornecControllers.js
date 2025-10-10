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

    async searchFornecedorByNome(req, res){

            try {
                    const { nome } = req.params;
                    if (!nome){
                        return res.status(400).send({ msg: 'Nome é obrigatório para o filtro.' });
                    }
                    const result = await knex('fornecedor')
                        .where('nome', 'like', `%${nome}%`)
                        .orderBy('nome');
                    return res.status(200).send(result);
                
            } catch (error) {
                return res.status(500).send(
                    { msg: 'Erro ao buscar fornecedor por nome.', error: error.message }
                );
            }
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
    },
    async deleteFor(req, res){    
        try {
            const { codfor } = req.params;
            if (!codfor) {
                return res.status(400).send({
                    msg: 'Código do fornecedor é obrigatório'
                });
            }

            const result = await knex('fornecedor').where({codfor});
            
            if (result.length > 0){
                await knex('fornecedor').where({codfor}).del();
                return res.status(200).send({
                    msg: 'Exclusão efetuada com sucesso!'
                });
            }  
            
            return res.status(404).send({
                msg: 'Fornecedor não encontrado'
            });
            
        } catch (error) {
            return res.status(500).send({
                msg: 'Erro ao excluir fornecedor',
                error: error.message
            });
        }
  
    }

}
