const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
console.log('aaaa')
//fetch request for post for the pokemon.
//dom contentloaded and write fetch requests
//fetch post request

//delete request ...

document.addEventListener('DOMContentLoaded', function () {
loadingPokemon()

});


function loadingPokemon(){
  //load the trainer and all their pokemon

  fetch(TRAINERS_URL)
  .then(resp => resp.json())
  .then(trainers => {
  console.log(trainers)
  })
}

//addpokemon, they should get a new pokemon
