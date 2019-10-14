const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

//   Use the Asynchrony to finish out this project.

const add_pokemon = document.getElementById('add_pokemons');
    add_pokemon.addEventListener('click', function (event){
        event.preventDefault()
      fetch(POKEMONS_URL)

    })


// fetch(BASE_URL)
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(json) {
//         console.log(json)
//     });