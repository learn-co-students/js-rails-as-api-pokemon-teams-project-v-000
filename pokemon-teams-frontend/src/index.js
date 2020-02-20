const BASE_URL = "http://localhost:3000"
const TRAINER_URL = `${BASE_URL}/trainer`
const POKEMON_URL = `${BASE_URL}/pokemon`

document.addEventListener('DOMContentLoaded', function() {
    loadTeams();
});

function loadTeams() {

    const teamData = TRAINER_URL

    fetch(teamData)
        .then(res => res.json())
        .then(results => {
            results.data.forEach(trainer => addCard(trainer))
            results.included.forEach(pokemon => listPokemon(pokemon))
            console.log(results)
        });
}

//Watch video, link to website, use debugger on fetch, trainer

function addCard(trainer) {
    let card = document.createElement('div');
    let body = document.querySelector('body');
    let pokemonList = document.createElement('ul');
    let addButton = document.createElement('button');

    pokemonList.id = 'pokemon-list-' + trainer.id;
    addButton.id = 'add-button';
    addButton.innerText = 'Add Pokemon'
    card.className = "card";

    trainerName = document.createElement('h1');
    trainerName.innerHTML = trainer.attributes.name;

    body.appendChild(card)
    card.appendChild(trainerName)
    card.appendChild(addButton)
    card.appendChild(pokemonList)

    // if trainer.relationships.pokemon.data.id

    // trainer.relationships.pokemon.data.forEach(pokemon => listPokemon(pokemon))


    document.getElementById("add-button").addEventListener("click", addPokemon);
}

function listPokemon(pokemon) {
    let pokemonList = document.querySelector(`#pokemon-list-${pokemon.relationships.trainer.data.id}`);
    let listItem = document.createElement('li');
    let releaseButton = document.createElement('button');
    releaseButton.className = 'release';
    releaseButton.innerText = 'Release';

    listItem.innerHTML = pokemon.attributes.nickname + ' (' + pokemon.attributes.species + ')'

    listItem.appendChild(releaseButton)

    pokemonList.appendChild(listItem)

    releaseButton.addEventListener("click", releasePokemon);

}

function addPokemon() {


}

function releasePokemon() {

}