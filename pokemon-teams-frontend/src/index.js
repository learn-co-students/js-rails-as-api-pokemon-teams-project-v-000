const BASE_URL = "http://localhost:3000"
const TRAINER_URL = `${BASE_URL}/trainer`
const POKEMON_URL = `${BASE_URL}/pokemon`

// const faker = require('faker');

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

    addButton.addEventListener("click", addPokemon);
}

// break up the below into two functions

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

// function addPokemon() {
//     // if team size is <6

//     if (event.target.parentElement.childNodes[2].childNodes.length < 6) {
//         console.log(event)

//         let name = faker.name.first_name
//         let species = faker.games.pokemon.name
//         const pokemon = new Pokemon()
//         return listPokemon(pokemon);
//     } else {
//         window.alert("Cannot add new pokemon. Team is full")
//     }
//     //  name = Faker::Name.first_name
//     //  species = Faker::Games::Pokemon.name

// }

function addPokemon() {
    event.preventDefault();

    let pokemonList = event.target.parentElement.childNodes[2].childNodes
    let listItem = document.createElement('li');
    pokemonList.appendChild(listItem);



    if (pokemonList.length < 6) {

        fetch(POKEMON_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": 'application/json'
                },
                body: JSON.stringify({
                    "nickname": 'test name',
                    "species": 'test species',
                    "trainer_id": event.target.parentElement.attributes.id
                })
            })
            .then((response) => response.json())
            .then((pokeObj) => {
                console.log(pokeObj)
                listItem.innerHTML = pokeObj.nickname + ' (' + pokeObj.species + ')'
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}

function releasePokemon(event) {

    fetch('https://example.com/delete-item/' + id, {
            method: 'DELETE',
        })
        .then(res => res.text()) // or res.json()
        .then(res => {
            let pokemon = event.target
            console.log(event)
            return pokemon.parentElement.remove();
        })




}