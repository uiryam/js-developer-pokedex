const pokeApi = {}

function convertPokeApiDetailtoPokemon (pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.num = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;
    
    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
    
    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailtoPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 2) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
            .then((response) => response.json())
            .then((jasonBody) => jasonBody.results)
            .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
            .then((detailRequests) => Promise.all(detailRequests))
            .then((pokemonsDetails) => pokemonsDetails)
            .catch((error) => console.log(error))
            .finally(() => console.log('Requisição concluída!'))
}


/*função para fazer o painel funcionar*/


function convertPokeApiDetail_Pokemon (pokeDetail) {
    const pokemon = new Pokemon_detail()
    pokemon.num = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;
    
    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    pokemon.hp = pokeDetail.stats[0].base_stat;
    pokemon.attack = pokeDetail.stats[1].base_stat;
    pokemon.defense = pokeDetail.stats[2].base_stat;
    pokemon.special_attack = pokeDetail.stats[3].base_stat;
    pokemon.special_defense = pokeDetail.stats[4].base_stat;
    pokemon.speed = pokeDetail.stats[5].base_stat;
    
    return pokemon;
}

pokeApi.getPokeApiDetail_Pokemon = (selectedPokemon) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`;
    return fetch(url)
    .then((response) => response.json())
    .then(convertPokeApiDetail_Pokemon)
}