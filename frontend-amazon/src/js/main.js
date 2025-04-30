// Config Biblioteca Axios
import axios from "axios";

const resultadoContainer = document.getElementById("resultado"); 
const formulario = document.getElementById("buscarProduto");

// Evento de envio do formulário
formulario.addEventListener("submit", function buscarProduto(event) {
  
  // Evita o comportamento padrão do form
  event.preventDefault();
  event.stopPropagation();

  const data = new FormData(event.target); // Cria um objeto com os dados do formulário
  const chave = data.get("keyword"); // Recupera o valor do input com nome "keyword"

  // Verifica se o campo foi preenchido
  if (verificarCampoPesquisa(chave)) {
    mostrarLoader();
    axios
      .get(`http://localhost:3000/api/scrape?keyword=${chave}`) // Faz requisição para a API
      .then((response) => { // Manipula a resposta da API

        resultadoContainer.innerHTML = ""; 
        criarResultadoFalha('');
        mostrarResultadoBusca(chave);
        esconderLoader();

        /*
        Ao receber os dados, limpa o conteúdo anterior e insere os novos resultados.
        Cria um card para cada item retornado da API e insere na tela.
        */

        response.data.forEach((item) => {
          const card = document.createElement("div");
          card.classList.add("card-resultado");

          card.innerHTML = `
          <img src="${item.urlImagens}" alt="${item.titulo}">
          <h3>${item.titulo}</h3>
          <p>⭐ ${item.avaliacao}</p>
          <p class="preco">${item.preco}</p>
        `;

          resultadoContainer.appendChild(card);
        });

        formulario.reset();

      })
      .catch((error) => { // Trata erros da requisição
        console.error("Erro na requisição:", error);

        esconderLoader();
        
        if (error.response) {
          console.log("Erro de resposta:", error.response.status);
          criarResultadoFalha(
            `Erro do servidor: ${error.response.status} - ${
              error.response.data?.error || "Tente novamente mais tarde."
            }`
          ); formulario.reset();
        } else if (error.request) {
          console.log("Erro de requisição, sem resposta.");
          criarResultadoFalha(
            "Servidor não respondeu. Verifique sua conexão ou tente novamente."
          );
          formulario.reset();
        } else {
          console.log("Erro desconhecido:", error.message);
          criarResultadoFalha("Erro inesperado: " + error.message);
          formulario.reset();
        }
      });
  }
});

// Função que verifica se a palavra-chave digitada no campo de busca é válida
function verificarCampoPesquisa(chave) {

  const chaveLimpa = chave.trim();

  if (chaveLimpa.length < 1) { 

    resultadoContainer.innerHTML = msgAlerta;

    // Limpa o cabeçalho de resultado da última busca
    limparResultadoBusca(chaveLimpa);

    setTimeout(fecharAlerta, 5000);

    return false;
  }
    return true;
}

const msgAlerta = `
<div class="msg-alert" id="alertBox"> 
  Não há dados a serem pesquisados 
  <button class="close-btn" onclick="fecharAlerta()">x</button>
</div>`;

// Função que exibe o texto com a palavra-chave pesquisada
function mostrarResultadoBusca(chave) {
  const header = document.querySelector('.resultado-header');
  if (!header) return;

  header.innerHTML = `
    <p>Resultado para
      <span class="resultado-span">${chave}</span>
    </p>
  `;
}

// Função que limpa o cabeçalho da última busca
function limparResultadoBusca(chave) {
    document.querySelector('.resultado-header').innerHTML = "";
}

// Função que exibe o texto com a mensagem de erro do Servidor
function criarResultadoFalha(texto) {

  const msgErro = document.querySelector('#resultado-falha');

  if(!texto) {
    msgErro.classList.remove('resultado-falha')
    return;
  }

  msgErro.innerHTML = texto;
  msgErro.classList.add('resultado-falha')
}

// Função que exibe o loader
function mostrarLoader() {
  document.getElementById('loader').classList.remove('hidden');
}

// Função que esconde o loader
function esconderLoader() {
  document.getElementById('loader').classList.add('hidden');
}
  