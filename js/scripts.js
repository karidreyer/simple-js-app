let pokemonRepository = (function () {

  let pokemonList = [];
  let prevURL = null;
  let nextURL = null;

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
  

  //Function to load the list of Pokemon from API
  function loadList(apiURL) {
    return fetch(apiURL).then(function (response) {
      return response.json();
    }).then(function (json) {
      prevURL = json.previous;
      nextURL = json.next;

      //Add disabled attribute if the URLs are null (for pagination)
      let prevBtn = document.getElementById('prev-btn')
      let nextBtn = document.getElementById('next-btn')
      !prevURL ? prevBtn.setAttribute('disabled', '') : prevBtn.removeAttribute('disabled');
      !nextURL ? nextBtn.setAttribute('disabled', '') : nextBtn.removeAttribute('disabled');

      //Clean up UI and Array (for pagination)
      let pokemonListUI = document.querySelector('.pokemon-list');
      pokemonListUI.innerHTML = '';
      pokemonList.length = 0;

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

  //Function to load further details of a pokemon for modal use
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.other.dream_world.front_default;
      item.height = details.height / 10; //Convert height to meters
      item.weight = details.weight / 10; //Convert weight to kilograms
      item.types = details.types;
      item.abilities = details.abilities;
    }).catch(function (e) {
      console.error(e);
    });
  }

// Function to display Pokemon Details in a modal
function showDetails(item) {
  pokemonRepository.loadDetails(item).then(function () {
    let modalTitle = document.querySelector('.modal-title');
    let modalBody = document.querySelector('.modal-body');

    // Clear existing content
    modalTitle.innerHTML = '';
    modalBody.innerHTML = '';

    // Create elements
    let pokemonName = document.createElement('h5');
    pokemonName.textContent = item.name;

    let pokemonImage = document.createElement('img');
    pokemonImage.src = item.imageUrl;
    pokemonImage.alt = item.name;
    pokemonImage.classList.add('modal-image'); // Add a class for styling

    let pokemonHeight = document.createElement('p');
    pokemonHeight.textContent = 'Height: ' + item.height + 'm';

    let pokemonWeight = document.createElement('p');
    pokemonWeight.textContent = 'Weight: ' + item.weight + 'kg';

    // Append elements to modal body
    modalTitle.appendChild(pokemonName);
    modalBody.appendChild(pokemonImage);
    modalBody.appendChild(pokemonHeight);
    modalBody.appendChild(pokemonWeight);

    // Show modal using Bootstrap jQuery
    $('#pokemonDetailsModal').modal('show');
  });
}

  function getNextUrl() {
    return nextURL
  }

  function getPrevUrl() {
    return prevURL
  }

  return {
    getAll,
    add,
    addListItem,
    loadList,
    loadDetails,
    showDetails,
    getNextUrl,
    getPrevUrl
  }
})();

const API_URL = 'https://pokeapi.co/api/v2/pokemon/?limit=24';


//Create each pokemon list item in the DOM by calling the getAll, addListItem, and loadList functions
window.addEventListener('DOMContentLoaded', function () { //Wait for content to load before displaying for better user experience
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  prevBtn.addEventListener('click', () => {
    const prevURL = pokemonRepository.getPrevUrl();
    if (prevURL) {
      pokemonRepository.loadList(prevURL).then(function() {
        pokemonRepository.getAll().forEach(function(pokemon) {
          pokemonRepository.addListItem(pokemon);
        });
      });
    }
  })

  nextBtn.addEventListener('click', () => {
    const nextURL = pokemonRepository.getNextUrl();
    if (nextURL) {
      pokemonRepository.loadList(nextURL).then(function() {
        pokemonRepository.getAll().forEach(function(pokemon) {
          pokemonRepository.addListItem(pokemon);
        });
      });
    }
  })

  pokemonRepository.loadList(API_URL).then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });
});

//Create "Back to top" button
let backToTopBtn = document.getElementById('back-to-top-btn');

//Display "Back to top" button when user scrolls down the page. Hide it when they are at the top.
window.addEventListener('scroll', () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});

//Move back to the top of the page when the user clicks on the "Back to top" button
backToTopBtn.addEventListener('click', () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});
