# 🛒 Projeto API Amazon - Web Scraper

Este projeto é uma aplicação fullstack simples que permite buscar produtos diretamente no site da Amazon com base em uma palavra-chave. Os resultados são apresentados de forma visual e interativa ao usuário, utilizando scraping de dados do frontend para o backend.

## 📸 Demonstração

<p align="center">
    <img src="frontend-amazon/public/img/logo-amazon.png" alt="Imagem da Interface" width="250"/>
</p>

## 📦 Tecnologias Utilizadas

### Frontend
- HTML5, CSS3, JavaScript
- Axios para requisições HTTP

### Backend
- Node.js com Express
- Axios para scraping
- JSDOM para parsing de HTML
- CORS para comunicação entre frontend e backend

---

## 🚀 Funcionalidades

- Campo de pesquisa com validação
- Exibição de produtos com imagem, título, avaliação e preço
- Loader animado enquanto carrega
- Tratamento de erros com mensagens amigáveis
- Responsividade e estilo limpo

---

## ⚙️ Como Executar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio

```
### 2. Instale as dependências

```bash
npm install

```
### 3. Inicie o backend

```bash
node app.js

```
### 4. Inicie o frontend

```bash
npm run dev
```

## 📂 Estrutura de Pastas
```bash
    DESAFIO-TECNICO/
    ├── backend-amazon/
    │   ├── node_modules/
    │   ├── app.js
    │   ├── package.json
    │   ├── package-lock.json
    │   └── statusPagina.js
    │
    ├── frontend-amazon/
    │   ├── node_modules/
    │   ├── public/
    │   ├── src/
    │   │   ├── css/
    │   │   │   ├── style.css
    │   │   │   └── variaveis.css
    │   │   └── js/
    │   │       └── main.js
    │   ├── .gitignore
    │   ├── index.html
    │   ├── package.json
    │   └── package-lock.json
    │
    ├── README.md
```
