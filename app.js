// Criação de variável para listar os números sorteados!
let listaSorteados = [];

// Criação da variável de número máximo!
let numeroMaximo = 100;

// Criação da variável que determina o número de tentativas!
let tentativas = 1;

// Criação de variável do número secreto!
let numeroSecreto = gerarNumeroAleatorio();

console.log(numeroSecreto);

// Criação de função para exibir texto na tela!
function exibirNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;

    // Utilização do ResponsiveVoice
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

// Criação de função para exibição de mensagens iniciais com inserção de dados!
function exibirMensagemInicial() {
    exibirNaTela('h1', 'Jogo do Número Secreto!');
    exibirNaTela('p', 'Escolha um número entre 1 e ' + numeroMaximo + '!');
}

exibirMensagemInicial();

// Criação de função para limpar campo de texto!
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

// Criação de função para verificar o chute!
function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = 'Você descobriu o número secreto com ' + tentativas + ' ' + palavraTentativa + '!';
        exibirNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    else {
        if (chute > numeroSecreto) {
            exibirNaTela('p', 'O número secreto é menor que ' + chute + '!');
        }
        else {
            exibirNaTela('p', 'O número secreto é maior que ' + chute + '!');
        }
        tentativas++;
        limparCampo();
    }
}

// Criação de função para gerar número aleatório!
function gerarNumeroAleatorio() {
    // Criação de variável para geração de números aleatórios!
    let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);

    // Criação de variável que conste a quantidade de números que já foram sorteados!
    let quantidadeLista = listaSorteados.length;

    // Limpar a lista caso atinja valor máximo
    if (quantidadeLista == numeroMaximo) {
        listaSorteados = [];
    }

    // Verifica se o número sorteado já consta na lista!
    if (listaSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    }
    else {
        listaSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}