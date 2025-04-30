const online =`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <title>Status do Servidor</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f2f2f2;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
                margin: 0;
            }
            h1 {
                color: #2ecc71;
                font-size: 3rem;
                margin-bottom: 10px;
            }
            p {
                color: #333;
                font-size: 1.2rem;
            }
        </style>
    </head>
    <body>
        <h1>Servidor Online ✅</h1>
        <p>Seu backend está rodando normalmente.</p>
    </body>
    </html>
  `;

const offline = `
  <!DOCTYPE html>
  <html lang="pt-BR">
  <head>
      <meta charset="UTF-8">
      <title>Erro no Servidor</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #ffe5e5;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh;
              margin: 0;
          }
          h1 {
              color: #e74c3c;
              font-size: 3rem;
              margin-bottom: 10px;
          }
          p {
              color: #555;
              font-size: 1.2rem;
          }
      </style>
  </head>
  <body>
      <h1>Erro no Servidor ❌</h1>
      <p>Desculpe, estamos enfrentando problemas técnicos.</p>
  </body>
  </html>
`

module.exports = { online, offline };