const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main');

document.addEventListener('DOMContentLoaded',()=> {

    function createTrainerCard(trainer) {
        let cardButton = document.createElement('button');
        cardButton.setAttribute('data-trainer-id', `${trainer.id}`);
        cardButton.innerText = "Add Pokemon";
        let trainerName = document.createElement('p');
        trainerName.innerText = trainer.name;
        let pokemonList = document.createElement('ul');
        trainer.pokemons.forEach(pokemon => {
            let li = document.createElement('li')
            let pokemonButton = document.createElement('button');
            pokemonButton.setAttribute('class','release');
            pokemonButton.setAttribute('data-pokemon-id',`${pokemon.id}`);
            pokemonButton.innerText = "Release";
            // pokemonButton.addEventListener('click', (e) => {

            // })
            li.innerText = `${pokemon.nickname} (${pokemon.species})`;
            li.appendChild(pokemonButton);
            pokemonList.appendChild(li);
        });
        let trainerCard = document.createElement('div');
        trainerCard.setAttribute('class', 'card');
        trainerCard.setAttribute('data-id',`${trainer.id}`);
        trainerCard.append(cardButton, pokemonList);
    };

    function appendTrainerCards(trainers) {
        trainers.forEach(trainer => {
            const div = createTrainerCard(trainer);
            main.append(div);
        });
    }


    function renderTrainers() {
        return fetch(TRAINERS_URL)
        .then(resp => resp.json())
        .then(json => appendTrainerCards(json));
    };

    renderTrainers()

})


