const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
let pokemonCollection = document.querySelector('#pokemon-collection')

document.addEventListener("DOMContentLoaded", function() {
    
    getAllPokemon()
   
    .then(pokemons => {
      pokemons.forEach(pokemon => {
        postPokemon(pokemon)
      })
    })
  });

  function getAllPokemon() {
    return fetch('http://localhost:3000/pokemons')
    .then(function(response) {
      return response.json();
    }) 
  }

  function postPokemon(pokemon) {
    //variables are declared and initialized with elements and attributes
    //let element = document.createElement(tagName);
    let h2 = document.createElement('h2')
    h2.innerText = pokemon.nickname
  
    let divparentcard = document.createElement('div')
    divparentcard.setAttribute('class', 'card')
    // div card is created and all newly created elements with their
    //associated attributes are appended
    divparentcard.append(h2)
    pokemonCollection.append(divparentcard)
  }
