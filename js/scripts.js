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

  // Function to make a list of all Pokemon in the repository
  function getAll () {
    return pokemonList
  }

  //Function to add a Pokemon to the repository
  function add (pokemon) {
    pokemonList.push(pokemon);
  }

  //Function to create a list item in the DOM for each Pokemon
  function addListItem (pokemon) {

    //Identify a variable for the ul "pokemon-list" in index.html
    let pokemonList = document.querySelector('.pokemon-list');
    
    //Create list item element
    let listItem = document.createElement('li');

    //Create a button with the pokemon's name and give it the class "button" for CSS styling
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    //Add event listener to button, call "showDetails" function when clicked
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });

    //Append one of the above buttons to each of the above list items
    listItem.appendChild(button);

    //Append the list item to the DOM within the ul "pokemon-list"
    pokemonList.appendChild(listItem);
  }

   //Function to display Pokemon Details
   function showDetails(pokemon) {
    console.log(pokemon);
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem
  }
})();

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});