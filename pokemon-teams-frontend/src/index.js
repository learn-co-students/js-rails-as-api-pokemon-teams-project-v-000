const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

//fetch trainers
//createelements: div, button, ul, li

fetch(TRAINERS_URL)
.then(response => response.json())
.then(json => console.log(json))
