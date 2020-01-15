const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded',()=> {
    const main = document.querySelector('main');

    function appendPokemon(json) {
        const li = createPokemonLi(json);
        const trainerId = json.trainer_id;
        const pokemonList = document.querySelector(`[data-id="${trainerId}"] ul`)
        pokemonList.appendChild(li);
    };

    function addPokemon(event) {
        const pokemonCount = event.target.nextElementSibling.childElementCount
        const trainerId = event.target.dataset.trainerId
        if (pokemonCount < 6) {
            return fetch("http://localhost:3000/pokemons", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"},
            body: JSON.stringify({trainer_id: trainerId})
            })
            .then(resp => resp.json())
            .then(json => appendPokemon(json));
        }
    };

    function createPokemonLi(pokemon) {
        let li = document.createElement('li')
        let pokemonButton = document.createElement('button');
        pokemonButton.setAttribute('class','release');
        pokemonButton.setAttribute('data-pokemon-id',`${pokemon.id}`);
        pokemonButton.innerText = "Release";
        pokemonButton.addEventListener('click', (event) => {
            deletePokemon(event);
        });
        li.innerText = `${pokemon.nickname} (${pokemon.species})`;
        li.appendChild(pokemonButton);
        return li    
    }

    function createTrainerCard(trainer) {
        let cardButton = document.createElement('button');
        cardButton.setAttribute('data-trainer-id', `${trainer.id}`);
        cardButton.innerText = "Add Pokemon";
        cardButton.addEventListener('click', (event) => {
            event.preventDefault();
            addPokemon(event);
        })
        let trainerName = document.createElement('p');
        trainerName.innerText = trainer.name;
        let pokemonList = document.createElement('ul');
        trainer.pokemons.forEach(pokemon => {
            const li = createPokemonLi(pokemon);
            pokemonList.appendChild(li);
        });
        let trainerCard = document.createElement('div');
        trainerCard.setAttribute('class', 'card');
        trainerCard.setAttribute('data-id',`${trainer.id}`);
        trainerCard.append(cardButton, pokemonList);
        return trainerCard
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

    function deletePokemon(event) {
        return fetch(`http://localhost:3000/pokemons/${event.target.dataset.pokemonId}`, {
          method: "DELETE"
        })
        .then(resp => resp.json())
        .then(json => removePokemon(json));
    }

    function removePokemon(json) {
        const pokemonId = json.id;
        const pokemonLi = document.querySelector(`[data-pokemon-id="${pokemonId}"]`).parentElement;
        pokemonLi.remove();
    }
    
    renderTrainers();

})