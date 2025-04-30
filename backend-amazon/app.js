// ========================
// IMPORTAÇÃO DE MÓDULOS
// ========================

const express = require('express');
const app = express();
const port = 3000;

const axios = require('axios');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const cors = require('cors')
app.use(cors())

const statusPage = require('./statusPagina');

// ========================
// ROTA DE STATUS PRINCIPAL
// ========================

// Rota raiz que retorna a página "online" para confirmar que o servidor está funcionando
app.get('/', (req, res) => {
    res.status(200).send(statusPage.online);
})


// ========================
// ROTA DE WEB SCRAPING
// ========================

// Exemplo: http://localhost:3000/api/scrape?keyword=boneco
app.get('/api/scrape', async (req, res) => {
    const retorno = []; 
    const palavraChave = req.query.keyword;

    try {
        const resultado = await axios.get(`https://www.amazon.com.br/s?k=${palavraChave}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
            }
        });

        const dom = new JSDOM(resultado.data);
        const itens = dom.window.document.querySelectorAll("div[role='listitem']");

        itens.forEach(item => {

            const titulo = item.querySelector('[data-cy="title-recipe"]')?.textContent;
            let preco = item.querySelector('[data-cy="price-recipe"] .a-offscreen')?.textContent;
            let avaliacao = item.querySelector('[data-cy="reviews-block"] .a-declarative')?.textContent;

            if(!titulo || titulo.toLocaleLowerCase().includes('patrocinado')){
                return
            }
            
            if(!avaliacao) {
                avaliacao = "Não informado";  
            }

            if(!preco) {
                preco = "R$ Não informado";  
            }
            
            const produto = {};
            produto.titulo = titulo;
            produto.preco = preco;
            produto.avaliacao = avaliacao;

            produto.urlImagens = item.querySelector('.s-image')?.getAttribute('src');

            // Adiciona o produto ao array de retorno
            retorno.push(produto);
        });

        res.status(200).send(retorno);

    } catch (error) {
        console.error("Erro ao acessar Amazon:", error.message);
        res.status(503).send(statusPage.offline).json({ error: "Serviço indisponível. Falha ao acessar a Amazon." });
    }
});


// Inicia o servidor na porta definida e exibe no terminal
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


