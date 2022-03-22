//DESCOBRIR ALTURA E LARGURA -> PAR AQUE OS MOSQUITOS NAO APAREÇAM FORA DA TELA
var altura = 0
var largura = 0
var vidas = 1
var tempo = 20

var criaMosquitoTempo = 1500

var nivel = window.location.search // VAI BUSCAR O LINK DEPOIS DE ?
nivel = nivel.replace('?', '')
//DEFINIR O TEMPO DE CRIAR MOSQUITO COM A DIFICULDADE
if(nivel === 'normal'){
	criaMosquitoTempo = 1500
} else if(nivel === 'dificil'){
	criaMosquitoTempo = 1000
} else if(nivel === 'chucknorris'){
	criaMosquitoTempo = 750
}

function ajustaTamanhoPalcoJogo(){
	altura = window.innerHeight
	largura = window.innerWidth
	console.log(largura, altura)	
}

ajustaTamanhoPalcoJogo()

//COLOCAR CRONOMETRO
var cronometro = setInterval(function(){
	tempo -= 1
	// CONDIÇÃO: SE TERMINAR TEMPO COM VIDAS -> VITORIA
	if(tempo < 0){
		clearInterval(cronometro) //LIMPAR CRONOMETRO
		clearInterval(criaMosquito) // LIMPAR CRIAÇÃO DE MOSQUITOS
		window.location.href = 'vitoria.html'
	}else{
		document.getElementById('cronometro').innerHTML = tempo //COLOCAR O VALOR ENTRE AS TAGS (NESTA CASO O SPAN)
	}
}, 1000)

//COLOCAR VALORES RANDOM PARA COLOCAR O MOSQUITO NA TELA
function posicaoRandom(){

	//REMOVER MOSQUITO ANTERIOR CASO EXISTA
	if (document.getElementById('mosquito')) {
		document.getElementById('mosquito').remove()

		//VIDAS DO JOGADOR
		if(vidas > 3){
			window.location.href = 'fim_de_jogo.html'
		}
		else{
			document.getElementById('v'+ vidas).src = "imagens/coracao_vazio.png"
			vidas++
		}

	}

	//VARIAVEIS PARA POSICAO DE X E Y MOSQUITO
	var posicaoX = Math.floor(Math.random() * largura) - 90
	var posicaoY = Math.floor(Math.random() * altura) - 90

	if (posicaoX < 0) { //EVITAR QUE FIQUE FORA DA TELA
		posicaoX = 0
	}
	if (posicaoY < 0) {	//EVITAR QUE FIQUE FORA DA TELA
		posicaoY = 0
	}

	console.log(posicaoX, posicaoY)


	//CRIAR O ELEMENTO HTML
	var mosquito = document.createElement('img') // CRIAR IMAGEM NO HTML
	mosquito.src = 'imagens/mosca.png' //DEFINIR SRC
	mosquito.className = tamanhoRandomMosquito() + ' ' + ladoRandom() //DEFINIR CLASS
	mosquito.style.left = posicaoX + 'px' //COLAVA VALOR RANDOM NO EIXO X
	mosquito.style.top = posicaoY + 'px' //COLAVA VALOR RANDOM NO EIXO Y
	mosquito.style.position = 'absolute' // DEFINIR POSIÇÃO ABSOLUTE
	mosquito.id = 'mosquito'
	mosquito.onclick = function(){ // REMOVER MOSQUITO AO CARREGAR
		this.remove() //this faz ref ao prorpio elemento
	}

	document.body.appendChild(mosquito) // CRIAR PARA O FILHO DO BODY

}

//COLOCAR VALORES RANDOM PARA O TAMANHO DO MOSQUITO
function tamanhoRandomMosquito(){
	var classe = Math.floor(Math.random() * 3)
	//VALOR É ARREDONDADO PARA BAIXO LOGO VAI DE 0 A 2
	switch(classe){
		case 0:
			return 'mosquito1'
		case 1:
			return 'mosquito2'
		case 2:
			return 'mosquito3'
	}
}

//COLOCAR MOSQUITO EM LADO a OU LADO b
function ladoRandom(){
		var classe = Math.floor(Math.random() * 2)
	//VALOR É ARREDONDADO PARA BAIXO LOGO VAI DE 0 A 2
	switch(classe){
		case 0:
			return 'ladoA'
		case 1:
			return 'ladoB'
	}
}