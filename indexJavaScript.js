var pokemonLista;
var novoHtml;
var botao;
var limit;
var offset;
var limiteMaximo = 1080;
var registroNovaPagina;

pokemonLista = document.getElementById('pokemonLista')

function carregarMaisPokemonItens(offset, limit){
    pokeApi.getPokemons(offset, limit).then(function(pokemons = []){

        novoHtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}">
                    <span class="numero">#${pokemon.number}</span>
                    <span class="nome">${pokemon.name}</span>
                    <div class="detalhe">
                        <ol class="tipos">
                            ${pokemon.types.map((type) => `<li class="tipo ${type}">${type}</li>`).join('')}
                        </ol>
                            <img src="${pokemon.photo}" width="100"
                            alt="${pokemon.name}"/>
                    </div>       
        </li> 
        `).join('')

        pokemonLista.innerHTML += novoHtml  
        
    })
    
}

botao = document.getElementById('botao')
limit = 10;
offset = 0;

carregarMaisPokemonItens(offset, limit)

botao.addEventListener('click', () => {
    offset += limit

    registro = (offset + limit)

    if (registroNovaPagina >= limiteMaximo) {
        var novoLimite = (limiteMaximo - offset)
        carregarMaisPokemonItens(offset, limit)
        botao.parentElement.removeChild(botao)
    } else{
        carregarMaisPokemonItens(offset, limit)
    }
})