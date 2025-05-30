const express = require('express');
const raizControllers = require('./controllers/raizControllers');
const fornecControllers = require('./controllers/fornecControllers');

const routes = express.Router();

routes.get('/',raizControllers.raiz);
routes.get('/fornecedorcod', fornecControllers.searchFornecedorAllCod);
routes.get('/fornecedornome', fornecControllers.searchFornecedorAllNome);
routes.post('/fornecedor',fornecControllers.create);
routes.put('/fornecedor/:codfor',fornecControllers.updatefor);

module.exports = routes;