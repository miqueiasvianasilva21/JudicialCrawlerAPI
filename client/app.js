const axios = require('axios');// o axios é utilizado para realizar as requisições HTTP
const readline = require('readline');// o realine é utilizado para obter os inputs do usuário


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`Digite o número do processo (no formato "0000-00.0000.0.00.0000"): `, (numero) => {
  rl.question('Digite o tribunal do processo (tjce ou tjal): ', async (tribunal) => {
    console.log("Digite um número de acordo com o que deseja:\n");
    console.log("1. Obter dados do primeiro grau.\n2. Obter dados do segundo grau.\n3. Obter dados em primeiro e segundo grau.\n");
    rl.question('Digite o número: ', async (opcao) => {
      // Verifica se as entradas estão de acordo com as pré-definidas
      if ((opcao === '1' || opcao === '2' || opcao === '3') && (tribunal === 'tjce' || tribunal === 'tjal')) {
        try {
          numero = numero.toString();
          tribunal = tribunal.toString();
          opcao = opcao.toString();

          // criação do vetor com os dados
          const data = { numero, tribunal, opcao };

          // Conversão do vetor em json
          const jsonData = JSON.stringify(data);

          const startTime = Date.now(); // obtém o tempo do início da solicitação

          //requisição post enviando o json no body
          const response = await axios.post('http://localhost:3000/buscar-processo', jsonData, { 
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const endTime = Date.now();// Obtém o tempo de término da requisição
          const elapsedTime = endTime - startTime; // Obtém o tempo decorrido desde a requisição

          console.log('Dados do processo:', response.data);
          console.log(`Tempo decorrido: ${elapsedTime}ms`);
        } catch (error) {
          console.error('Ocorreu um erro ao buscar os dados do processo:', error.message);
        } finally {
          rl.close();
        }
      } else {
        console.log('ENTRADA INVÁLIDA'); // Se a entrada não corresponder ás pré-definidas é exibido "ENTRADA INVÁLIDA"
        rl.close();
      }
    });
  });
});
