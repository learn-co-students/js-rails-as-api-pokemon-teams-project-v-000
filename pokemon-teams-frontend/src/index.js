const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
document.addEventListener("DOMContentLoaded", fetchTrainersAndPokemons);

function fetchTrainersAndPokemons() {
    console.log("fetchData");
    fetch(TRAINERS_URL)
        .then(resp => resp.json())
        .then(json => json.forEach(trainer => buildTrainerCard(trainer)))
        .catch(error => console.log(`My Error: ${error}`));

}

function buildTrainerCard(trainer) {
    console.log(trainer);
    let trainerCardContainer = buildTrainerCardContainer(trainer);

    trainerCardContainer.appendChild(buildTrainerPElem(trainer));
    trainerCardContainer.appendChild(buildAddPokemonButton(trainer));
    trainerCardContainer.appendChild(buildPokemonListContainer(trainer.pokemons));

    document.querySelector("main").appendChild(trainerCardContainer);

}

function buildTrainerCardContainer(trainer) {
    const cardContainerDiv = document.createElement("div");
    cardContainerDiv.className = 'card';
    cardContainerDiv.setAttribute("data-id", trainer.id);
    return cardContainerDiv;
}

function buildTrainerPElem(trainer) {
    const trainerNameP = document.createElement("p");
    trainerNameP.textContent = trainer.name;
    return trainerNameP;
}

function buildAddPokemonButton(trainer) {
    const addPokemonButton = document.createElement("button");
    addPokemonButton.setAttribute("data-trainer-id", trainer.id);
    addPokemonButton.addEventListener("click", addPokemon);
    addPokemonButton.textContent = "Add Pokemon";
    return addPokemonButton;
}

function buildPokemonListContainer(pokemons) {
    const pokemonListContainer = document.createElement("ul");
    pokemons.forEach(pokemon => pokemonListContainer.appendChild(buildPokemonElem(pokemon)));
    return pokemonListContainer;
}

function buildPokemonElem(pokemon) {
    const relPokemonButton = document.createElement("button");
    const pokemonListElem = document.createElement("li");

    pokemonListElem.textContent = pokemon.nickname;

    relPokemonButton.className = 'release';
    relPokemonButton.setAttribute("data-pokemon-id", pokemon.id);
    relPokemonButton.addEventListener("click", releasePokemon);
    relPokemonButton.textContent = "Release";

    pokemonListElem.appendChild(relPokemonButton);
    return pokemonListElem;
}

function addPokemon(event) {
    let currentNode = event.target
    console.log(`Processing to add: ${currentNode}`);
    let trainer_id = currentNode.getAttribute("data-trainer-id")

    configurationObject = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        // body: JSON.stringify({ trainer_id: trainer_id })
    };
    // return fetch(POKEMONS_URL, configurationObject)
    return fetch(`${TRAINERS_URL}/${trainer_id}/pokemons`, configurationObject)
        .then(resp => resp.json())
        .then(json => {
            if (json.hasOwnProperty("message")) {
                console.log(json["message"]);
            } else {
                currentNode.nextElementSibling.appendChild(buildPokemonElem(json))
            }
        })
        .catch(error => console.log(`Bad things have happend!: ${error}`));
}

function releasePokemon(event) {
    let currentNode = event.target
    console.log(`Processing to remove: ${currentNode}`);

    let pokemon_id = currentNode.getAttribute("data-pokemon-id")
    let trainerCardDiv = currentNode.closest("div");
    let trainer_id = trainerCardDiv.querySelector("button").getAttribute("data-trainer-id");

    configurationObject = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
    };

    return fetch(`${TRAINERS_URL}/${trainer_id}/pokemons/${pokemon_id}`, configurationObject)
        .then(resp => resp.json())
        .then(pokemon => currentNode.closest("ul").removeChild(currentNode.parentNode))
        .catch(error => console.log(`Bad things have happend!: ${error}`));
}