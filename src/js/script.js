

function obterAnoAtual() {
  return 2026;
}

function lerTexto(mensagem) {
  let texto = prompt(mensagem);
  while (texto === null || texto.trim() === "") {
    alert("Entrada inválida! Digite um texto.");
    texto = prompt(mensagem);
  }
  return texto.trim();
}


function lerNumero(mensagem, minimo, maximo) {
  let valor = prompt(mensagem);
  let numero = Number(valor);
  while (valor === null || valor.trim() === "" || !Number.isInteger(numero) || numero < minimo || numero > maximo) {
    alert("Valor inválido! Digite um número inteiro entre " + minimo + " e " + maximo + ".");
    valor = prompt(mensagem);
    numero = Number(valor);
  }
  return numero;
}


function perguntarContinuar() {
  let resposta = prompt("Deseja cadastrar outro vinho? (s/n)");
  while (resposta === null || (resposta.trim().toLowerCase() !== "s" && resposta.trim().toLowerCase() !== "n")) {
    alert("Responda apenas com 's' ou 'n'.");
    resposta = prompt("Deseja cadastrar outro vinho? (s/n)");
  }
  return resposta.trim().toLowerCase() === "s";
}


function estoqueBaixo(quantidade) {
  return quantidade < 5;
}


function classificarVinho(safra) {
  const idade = obterAnoAtual() - safra;
  if (idade <= 5) {
    return "Jovem";
  } else if (idade <= 15) {
    return "Amadurecido";
  } else {
    return "Antigo";
  }
}


function mostrarVinho(numero, nome, safra, quantidade, classificacao, baixo) {
  const aviso = baixo ? "ESTOQUE BAIXO!" : "Estoque ok";
  const texto =
    "Vinho #" + numero +
    "\nNome: " + nome +
    "\nSafra: " + safra +
    "\nQuantidade: " + quantidade +
    "\nClassificação: " + classificacao +
    "\n" + aviso;
  console.log(texto);
  alert(texto);
}



function iniciarCadastro() {
  const MAX_VINHOS = 5; 
  const anoLimite = obterAnoAtual();

  let nome1 = "", safra1 = 0, quant1 = 0;
  let nome2 = "", safra2 = 0, quant2 = 0;
  let nome3 = "", safra3 = 0, quant3 = 0;
  let nome4 = "", safra4 = 0, quant4 = 0;
  let nome5 = "", safra5 = 0, quant5 = 0;

  let contador = 0;
  let totalEstoqueBaixo = 0;
  let nomeMaisAntigo = "";
  let safraMaisAntiga = 0;
  let continuar = true;

  while (continuar && contador < MAX_VINHOS) {
    const nome = lerTexto("Nome do vinho:");
    const safra = lerNumero("Ano da safra (ex: 2015):", 1900, anoLimite);
    const quantidade = lerNumero("Quantidade em estoque:", 0, 100000);

    contador++;

    switch (contador) {
      case 1: nome1 = nome; safra1 = safra; quant1 = quantidade; break;
      case 2: nome2 = nome; safra2 = safra; quant2 = quantidade; break;
      case 3: nome3 = nome; safra3 = safra; quant3 = quantidade; break;
      case 4: nome4 = nome; safra4 = safra; quant4 = quantidade; break;
      case 5: nome5 = nome; safra5 = safra; quant5 = quantidade; break;
    }

    const classificacao = classificarVinho(safra);
    const baixo = estoqueBaixo(quantidade);

    if (baixo) {
      totalEstoqueBaixo++;
    }

    
    if (contador === 1 || safra < safraMaisAntiga) {
      safraMaisAntiga = safra;
      nomeMaisAntigo = nome;
    }

    mostrarVinho(contador, nome, safra, quantidade, classificacao, baixo);

    if (contador < MAX_VINHOS) {
      continuar = perguntarContinuar();
    } else {
      alert("Limite de " + MAX_VINHOS + " vinhos atingido.");
    }
  }

  
  let resumo = "===== RESUMO =====" +
    "\nCadastros feitos: " + contador +
    "\nVinhos com estoque baixo: " + totalEstoqueBaixo;

  if (contador > 0) {
    resumo += "\nVinho mais antigo: " + nomeMaisAntigo + " (safra " + safraMaisAntiga + ")";
  }

  console.log(resumo);
  alert(resumo);
}


window.addEventListener("load", function () {
  setTimeout(iniciarCadastro, 300);
});