let pokemonRepository = (function () {

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');

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
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () { //First, load the pokemon details using the "loadDetails" function, then carry out the following..
      modalContainer.innerHTML = ''; //Clear any text in the modal

      let modal = document.createElement('div'); //Create a div for the modal in the DOM
      modal.classList.add('modal');
      modal.classList.add('modal-content');

      let closeButton = document.createElement('button'); //Create close button element
      closeButton.classList.add('modal-close'); //Add "modal-close" functionality to close button
      closeButton.innerText = 'Close';
      closeButton.addEventListener('click', hideModal); //Add "hideModal" functionality to close button when it's clicked on (closes modal)

      let modalTitle = document.createElement('h1'); //Create title text in the modal and make it the pokemon's name
      modalTitle.innerText = item.name;

      let modalImage = document.createElement('img');
      modalImage.src = item.imageUrl;

      let modalContent = document.createElement('p'); //Create content text in the modal and make it the pokemon's height and image
      modalContent.innerText = ('Height: ' + item.height + "m");

      modal.appendChild(closeButton);
      modal.appendChild(modalTitle);
      modal.appendChild(modalImage);
      modal.appendChild(modalContent);
      
      modalContainer.appendChild(modal);
      modalContainer.classList.add('is-visible'); //Make the modal visible
    });

    //Function to hide the Modal
    function hideModal() {
      modalContainer.classList.remove('is-visible');
    }
  
    //Code to hide modal when "esc" key is pressed (if modal is open)
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();  
      }
    });

    //Code to hide modal when user clicks outside of the modal (i.e. on the modal container/background)
    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
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

