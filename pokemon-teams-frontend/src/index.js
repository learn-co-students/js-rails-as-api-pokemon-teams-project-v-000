const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


function getTrainers() {
return fetch('TRAINERS_URL')
.then(resp => resp.json())

}