var url;
var pokeApi ={};
var pokemon;



function converterPokemonApiParaPokemon(pokeDetalhe) {
    pokemon = new Pokemon()
    pokemon.number = pokeDetalhe.id
    pokemon.name = pokeDetalhe.name
    var types = pokeDetalhe.types.map((typeSlot) => typeSlot.type.name);
    var [type] = types;

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetalhe.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonsDetails = pokemon => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(converterPokemonApiParaPokemon)
}

pokeApi.getPokemons = function(offset = 0, limit = 10){
    url = 'https://pokeapi.co/api/v2/pokemon?offset='+ offset +'&limit='+ limit +'';
    return fetch (url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetails))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokmeonsDetails) => pokmeonsDetails)
        .catch((error) => console.error(error))
}
