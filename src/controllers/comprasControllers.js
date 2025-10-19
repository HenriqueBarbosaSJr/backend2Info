const knex = require('../database/index.js');

module.exports = {

    async searchComprasAllCod(req, res){
        try {
            const result = await knex('compras').orderBy('codcomp');
            if(result.length > 0){
                return res.status(200).send({
                    msg: 'Compras encontradas com sucesso',
                    dados: result
                });
            } else {
                // Quando não há registros, é mais apropriado retornar 204 (No Content) ou 200 com array vazio
                return res.status(200).send({
                    msg: 'Nenhuma compra encontrada',
                    dados: []
                });
            }
        } catch (error) {
            console.error('Erro ao buscar compras:', error);
            return res.status(500).send({
                msg: 'Erro interno ao buscar compras',
                error: error.message
            });
        }
    },
    async createCompras (req, res){
        try {
            const { codcli, codpro, qtda, preco } = req.body;
            
            // Validação dos campos obrigatórios
            if (!codcli || !codpro || !qtda || !preco) {
                return res.status(400).send({
                    msg: 'Todos os campos são obrigatórios: codcli, codpro, qtda, preco'
                });
            }

            // Verifica se o cliente existe
            const resultcli = await knex('clientes').where({codcli});
            if (resultcli.length === 0) {
                return res.status(404).send({
                    msg: 'Cliente não encontrado',
                    codcli
                });
            }

            // Verifica se o produto existe
            const resultPro = await knex('produtos').where({codpro});
            if (resultPro.length === 0) {
                return res.status(404).send({
                    msg: 'Produto não encontrado',
                    codpro
                });
            }

            // Insere a nova compra
            await knex('compras').insert({
                codcli,
                codpro,
                qtda,
                preco
            });

            return res.status(201).send({
                msg: 'Compra registrada com sucesso',
                dados: {
                    codcli,
                    codpro,
                    qtda,
                    preco
                }
            });

        } catch (error) {
            console.error('Erro ao registrar compra:', error);
            return res.status(500).send({
                msg: 'Erro interno ao processar a compra',
                error: error.message
            });
        }
    }


}