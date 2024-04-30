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

  //Function to create a list item as a button in the DOM for each Pokemon
  function addListItem (pokemon) {
    let pokemonList = document.querySelector('.pokemon-list'); 
    let listItem = document.createElement('li'); 
    listItem.classList.add('list-group-item', 'list-group-item-action'); //Add Bootstrap utility classes
    listItem.setAttribute('role', 'listitem'); //Add ARIA role

    //Create a button element for each list item
    let button = document.createElement('button'); 
    button.innerText = pokemon.name;
    button.classList.add('btn', 'btn-outline-dark'); //Add Bootstrap utility classes
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#pokemonDetailsModal');
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

  //Function to display Pokemon Details in a modal
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      let modalTitle = document.querySelector('.modal-title');
      let modalBody = document.querySelector('.modal-body');
  
      // Clear existing content
      modalTitle.innerHTML = '';
      modalBody.innerHTML = '';
  
      let pokemonName = document.createElement('h5');
      pokemonName.textContent = item.name;
  
      let pokemonImage = document.createElement('img');
      pokemonImage.src = item.imageUrl;
      pokemonImage.alt = item.name;
  
      let pokemonHeight = document.createElement('p');
      pokemonHeight.textContent = 'Height: ' + item.height + 'm';
  
      modalTitle.appendChild(pokemonName);
      modalBody.appendChild(pokemonImage);
      modalBody.appendChild(pokemonHeight);
  
      $('#pokemonDetailsModal').modal('show');
    });
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  }
})();

//Code to create each pokemon list item in the DOM by calling the getAll, addListItem, and loadList functions
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
})

//Code for "Back to top" button functionality
let backToTopBtn = document.getElementById('back-to-top-btn');

window.addEventListener('scroll', () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});

backToTopBtn.addEventListener('click', () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

