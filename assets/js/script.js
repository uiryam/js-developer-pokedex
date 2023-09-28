const pokemonList = document.getElementsByClassName('pokemons')[0];
const loadMoreButton = document.getElementsByClassName('loadmore')[0];

const maxRecord = 152;
const limit = 10;
let offset = 0;

function loadPokemonsItens(offset, limit) {

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHTML = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}" id="${pokemon.num}">
                <span class="number">#${pokemon.num}</span>
                <span class="name">${pokemon.name}</span>
        
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    
                    <img src="${pokemon.photo}" alt="Imagem do Pokemon (${pokemon.name})">
                </div>

            </li>
        `).join("");

        pokemonList.innerHTML += newHTML

        })
}

loadPokemonsItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit;

    const qtRecordNextPage = offset + limit;

    if (qtRecordNextPage >= maxRecord) {
        const newLimit = maxRecord - offset;
        loadPokemonsItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonsItens(offset, limit)
    }

})

/*painel lateral */

const listPokemon = document.querySelector('.pokemons');
const painelLateral = document.querySelector('.painel-lateral');
const fecharPainel = document.getElementById('fecharPainel');
let painelAberto = false;
let selectedPokemon = null; // Adicione uma variável para armazenar o Pokémon selecionado

pokemonList.addEventListener('click', (event) => {
  const pokemon = event.target.closest('.pokemon');
  if (pokemon) {
    const num = pokemon.getAttribute('id'); // Obter o número do ID diretamente
    selectedPokemon = num/* Obtenha o objeto Pokemon correto com base no número ou outra lógica */;

    if (!painelAberto) {
      painelLateral.classList.remove('invisible'); // Mostra a caixa lateral
      console.log('Clicou em um Pokémon');
      loadPokemonsDetails(selectedPokemon); // Chame a função com o Pokémon selecionado
      painelAberto = true;
    }
  }
  
  fecharPainel.addEventListener('click', () => {
    painelLateral.classList.add('invisible'); // Oculta a caixa lateral ao clicar em Fechar
    const detailsList = document.querySelector('#detalhesPainel ul.pokemon_detail');
    detailsList.innerHTML = '';
    console.log('Clicou em Fechar');
    painelAberto = false;
  });

});



function loadPokemonsDetails(selectedPokemon) {
  pokeApi.getPokeApiDetail_Pokemon(selectedPokemon).then((pokemonDetail) => {
    const detailsList = document.querySelector('#detalhesPainel ul.pokemon_detail');

    const newHTML = `
    <div>
      <li class="pokemon-painel parte-superior">
          <span class="number">#${pokemonDetail.num}</span>
          <span class="name">${pokemonDetail.name}</span>
  
          <div class="superior-detail">
              <ol class="types">
                  ${pokemonDetail.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
              </ol>
              
              <img src="${pokemonDetail.photo}" alt="Imagem do Pokemon (${pokemonDetail.name})">
          </div>

      </li>
    </div>
    <div>
      <li class="pokemon-painel parte-inferior">
        <span class="stat-label">HP</span>
        <span class="stat-value">${pokemonDetail.hp}</span>
        <progress class="dados" max="100" value="${pokemonDetail.hp}"></progress>
        
        <span class="stat-label">Attack</span>
        <span class="stat-value">${pokemonDetail.attack}</span>
        <progress class="dados" max="100" value="${pokemonDetail.attack}"></progress>

        <span class="stat-label">Defense</span>
        <span class="stat-value">${pokemonDetail.defense}</span>
        <progress class="dados" max="100" value="${pokemonDetail.defense}"></progress>
        
        <span class="stat-label">SP Atk</span>
        <span class="stat-value">${pokemonDetail.special_attack}</span>
        <progress class="dados" max="100" value="${pokemonDetail.special_attack}"></progress>
        
        <span class="stat-label">SP Def:</span>
        <span class="stat-value">${pokemonDetail.special_defense}</span>
        <progress class="dados" max="100" value="${pokemonDetail.special_defense}"></progress>
        
        <span class="stat-label">Speed</span>
        <span class="stat-value">${pokemonDetail.speed}</span>
        <progress class="dados" max="100" value="${pokemonDetail.speed}"></progress>
        
      </li>
    </div>
  `;
  detailsList.innerHTML = newHTML;

  const conteudoPainel = document.querySelector('.conteudo-painel');
  conteudoPainel.className = `conteudo-painel ${pokemonDetail.type}`;



    
  });
}


  
