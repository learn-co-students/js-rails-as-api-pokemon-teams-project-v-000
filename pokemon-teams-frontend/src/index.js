const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.getElementById('pokemon-trainers')

// make a fetch request to the '/trainers' and display pokemons

fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(renderPokemons)


    function renderPokemons(arg){
        const trainers = arg['data']
        debugger

// create a div with class of 'card' for the trainer
// add a 'p' tag with the trainer's name
// add a button for adding a pokemon *** button must have logic to be disabled if trainer has 6 pokemons already
// create a 'ul' to hold the pokemons
// add each pokemon as an 'li' with species and nickname (in parentheses) and a "delete pokemon" button with class of "release"



        divElements = trainers.map(function(trainer){
            
        }