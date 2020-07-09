const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
document.addEventListener("DOMContentLoaded", fetchTrainersAndPokemons);

function fetchTrainersAndPokemons() {
    console.log("fetchData");
    fetch(TRAINERS_URL)
        .then(resp => resp.json())
        .then(json => json.forEach(elem => buildTrainerCard(elem)))
        .catch(error => console.log(`My Error: ${error}`));

}

function buildTrainerCard(trainer) {
    console.log(trainer);
    const cardContainerDiv = document.createElement("div");
    const trainerNameP = document.createElement("p");
    const addPokemonButton = document.createElement("button");
    const pokemonContainerList = document.createElement("ul");


    cardContainerDiv.setAttribute("class", "card");
    cardContainerDiv.setAttribute("data-id", trainer.id);

    trainerNameP.textContent = trainer.name;

    addPokemonButton.setAttribute("data-trainer-id", trainer.id);
    addPokemonButton.addEventListener("click", addPokemon);
    addPokemonButton.textContent = "Add Pokemon";

    // buildPokemonList(trainer.pokemons);
    trainer.pokemons.forEach(pokemon => {
        const pokemonListElem = document.createElement("li");
        pokemonListElem.textContent = pokemon.nickname;
        const relPokemonButton = document.createElement("button");
        relPokemonButton.setAttribute("class", "release");
        relPokemonButton.setAttribute("data-pokemon-id", pokemon.id);
        relPokemonButton.addEventListener("click", releasePokemon);
        relPokemonButton.textContent = "Release";

        pokemonListElem.appendChild(relPokemonButton);
        pokemonContainerList.appendChild(pokemonListElem);
    });

    document.querySelector("main").appendChild(cardContainerDiv);

    cardContainerDiv.appendChild(trainerNameP);
    cardContainerDiv.appendChild(addPokemonButton);
    cardContainerDiv.appendChild(pokemonContainerList);
}

function buildPokemonList(pokemons) {
    pokemons.forEach(elem => {
        const pokemonListElem = document.createElement("li");

        pokemonContainerList.appendChild(pokemonListElem);
    });
}

function addPokemon() {
    console.log("Added!");
}

function releasePokemon() {
    console.log("Removed!");
}