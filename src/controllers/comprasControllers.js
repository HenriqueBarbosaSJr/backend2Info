const knex = require('../database/index.js');

module.exports = {

    async searchComprasAllCod(req, res){
        try {
            const result = await knex('compras').orderBy('codcomp');
            if(result.length != 0 ){
                return res.status(200).send(result);
            }else{
                return res.status(500).send(
                    {msg:'Tabela vazia, nenhum registro encontrado!!'}
                );
            }
        } catch (error) {
            return res.status(500).send(
                {msg: 'Error ao buscas compras', error: error.message}
            );
        }
    },
    async createCompras (req, res){
        const { codcli, codpro, qtda, preco  } = req.body;
        
        const resultcli = await knex('clientes').where({codcli});
        if (resultcli.length === 0 ){
              return res.status(200).send( {msg: 'Error cliente não cadastrado'});
        }else{
            const resultPro = await knex('produtos').where({codpro});
            if(resultPro.length === 0){
                return res.status(200).send( {msg: 'Error produto não cadastrado'});
            }
        }
        await knex('compras')
            .insert({codcli, codpro, qtda, preco});
        return res.status(201).send({codcli, codpro, qtda, preco});

    }


}