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
    cardContainerDiv.setAttribute("class", "card");
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
    const pokemonListElem = document.createElement("li");
    pokemonListElem.textContent = pokemon.nickname;

    const relPokemonButton = document.createElement("button");

    relPokemonButton.setAttribute("class", "release");
    relPokemonButton.setAttribute("data-pokemon-id", pokemon.id);
    relPokemonButton.addEventListener("click", releasePokemon);
    relPokemonButton.textContent = "Release";

    pokemonListElem.appendChild(relPokemonButton);
    return pokemonListElem;
}

function addPokemon(event) {
    let currentNode = event.target
    let trainer_id = currentNode.getAttribute("data-trainer-id")

    console.log(`trainer_id: ${trainer_id}`);
    configurationObject = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ trainer_id: trainer_id })
    };
    return fetch(POKEMONS_URL, configurationObject)
        .then(resp => resp.json())
        .then(json => {
            if (json.hasOwnProperty("nickname")) {
                currentNode.nextElementSibling.appendChild(buildPokemonElem(json))
            }
        })
        // .then(new_pokemon => currentNode.nextElementSibling.appendChild(buildPokemonElem(new_pokemon)));
}

function releasePokemon() {
    console.log("Removed!");
}