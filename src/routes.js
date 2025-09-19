const express = require('express');
const raizControllers = require('./controllers/raizControllers');
const fornecControllers = require('./controllers/fornecControllers');
const produtosControllers = require('./controllers/produtosControllers');
const clientesControllers = require('./controllers/clientesControllers');
const comprasControllers = require('./controllers/comprasControllers');

const routes = express.Router();

routes.get('/',raizControllers.raiz);
// Rotas da tabela fornecedor
routes.get('/fornecedorcod', fornecControllers.searchFornecedorAllCod);
routes.get('/fornecedornome', fornecControllers.searchFornecedorAllNome);
routes.get('/fornecedorByNome/:nome', fornecControllers.searchFornecedorByNome);
routes.post('/fornecedor',fornecControllers.create);
routes.put('/fornecedor/:codfor',fornecControllers.updatefor);

// Rotas da tabela produtos
routes.get('/produtos',produtosControllers.searchProdutosAllCod);

// Rotas da tabela cliente
routes.get('/clientes', clientesControllers.searchClientesAllCod);

// Rotas da tabela compras
routes.get('/compras', comprasControllers.searchComprasAllCod);

module.exports = routes;