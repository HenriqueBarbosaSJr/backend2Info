const path = require('path');

module.exports = {
    raiz(req, res) {
        /* O método sendFile define o Content-Type automaticamente com base na
           extensão do arquivo. */
        const filePath = path.join(__dirname, '..', '..', 'documents', 'api_documentation.html');
        
        return res.sendFile(filePath, (err) => {
            if (err) {
                console.error('Erro ao enviar o arquivo:', err);
                res.status(err.status || 500).send({
                    msg: 'Erro ao carregar a página de documentação.',
                    error: err.message
                });
            }
        });
    }
};

