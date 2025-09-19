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
    }
}