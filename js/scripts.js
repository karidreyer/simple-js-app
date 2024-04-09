let pokemonRepository = (function () {

  let pokemonList = [
    {name: 'Bulbasaur', height: 0.7, types: ['grass','poison']},
    {name: 'Ivysaur', height: 1, types: ['grass','poison']},
    {name: 'Venusaur', height: 2, types: ['grass','poison']},
    {name: 'Charmander', height: 0.6, types: ['fire']},
    {name: 'Charmeleon', height: 1.1, types: ['fire']},
    {name: 'Charizard', height: 1.7, types: ['fire','flying']},
    {name: 'Squirtle', height: 0.5, types: ['water']},
    {name: 'Wartortle', height: 1, types: ['water']},
    {name: 'Blastoise', height: 1.6, types: ['water']},
  ];

  function getAll () {
    return pokemonList
  }

  function add (pokemon) {
    pokemonList.push(pokemon);
  }

  return {
    getAll: getAll,
    add: add
  };

})();

pokemonRepository.getAll().forEach(function(pokemon) {
  let pokemonList = document.querySelector('.pokemon-list');
  let listItem = document.createElement('li');
  let button = document.createElement('button');
  button.innerText = pokemon.name;
  button.classList.add('button-class');
  listItem.appendChild(button);
  pokemonList.appendChild(listItem);

});