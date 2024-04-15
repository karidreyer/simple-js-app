let pokemonRepository = (function () {

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
    let pokemonList = document.querySelector('.pokemon-list'); //Identify a variable for the ul "pokemon-list" in index.html
    let listItem = document.createElement('li'); //Create list item element

    let button = document.createElement('button'); //Create a button with the pokemon's name and give it the class "button" for CSS styling
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    button.addEventListener('click', function() { //Add event listener to button, call "showDetails" function when clicked
      showDetails(pokemon);
    });

    listItem.appendChild(button); //Append one of the above buttons to each of the above list items
    pokemonList.appendChild(listItem); //Append the list item to the DOM within the ul "pokemon-list"
  }

  //Function to load the lsit of Pokemon from API
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  //Function to load further details of a pokemon 
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  //Function to display Pokemon Details
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  }
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
})

