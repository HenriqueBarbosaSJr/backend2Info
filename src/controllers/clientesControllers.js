const knex = require('../database/index.js');
const bcrypt = require('bcrypt');

module.exports = {

        async searchClientesAllCod(req, res){
        try {
            const result = await knex('clientes').orderBy('codcli');
            if(result.length != 0 ){
                return res.status(200).send(result);
            }else{
                return res.status(500).send(
                    {msg:'Tabela vazia, nenhum registro encontrado!!'}
                );
            }
        } catch (error) {
            return res.status(500).send(
                {msg: 'Error ao buscas clientes', error: error.message}
            );
        }

    },
    async createClientes(req, res){
        try {
            // Desestruturação  >>> JSON para constante
            const { nome, email, uf, level } = req.body;
            console.log(req.body.password); 
            
            const  password  =  await bcrypt.hash(req.body.password, 10);
            console.log(password);
            const data = {
                nome:nome,
                email:email,
                uf:uf,
                password:password,
                level:level
            }
            console.log(data);
            
            const result = await knex('clientes').where({email});
            if ( result.length >= 1){
                return res.status(400).send( {erro: 'Email já cadastrado!'});
            }
            await knex('clientes')
                .insert(data);
                return res.status(201).send( {erro: 'Email já cadastrado!'});
        } catch (error) {
            return res.status(400).json({error: error.message});
        } 
    }    
}