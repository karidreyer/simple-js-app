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

//Initialize an empty string variables for displaying the Pokemon information
let pokemonName = "";
let pokemonHeight = "";

//Starting at the first item, display the Pokemon information and then move to the next item
for (let i = 0; i < pokemonList.length;) {
    pokemonName = pokemonList[i].name;
    pokemonHeight = pokemonList[i].height;
    //If pokemon has a height of 2m or more, comment that it is big
    if (pokemonHeight >= 2){
      document.write(pokemonName + " (height: " + pokemonHeight + ") -Wow, that’s big!<br>");
    }else {
      document.write(pokemonName + " (height: " + pokemonHeight + ")<br>");
    }
    i++;
  }