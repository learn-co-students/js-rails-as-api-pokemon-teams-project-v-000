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
            console.log(results)
        });
}

function addCard(trainer) {
    let card = document.createElement('div');
    let body = document.querySelector('body');
    card.className = 'card';
    trainerName = document.createElement('h1');
    trainerName.innerHTML = trainer.attributes.name;
    card.appendChild(trainerName)
    body.appendChild(card)
}

function loadPokemon() {

}

function addPokemon() {

}

function releasePokemon() {

}