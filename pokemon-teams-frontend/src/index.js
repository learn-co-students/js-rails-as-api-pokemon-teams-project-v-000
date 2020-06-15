const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainElement = document.querySelector("main");

function getTrainerData() {
    return fetch(TRAINERS_URL)
    .then(resp => resp.json())
}

function addPokemon(trainer_object) {
    return fetch(POKEMONS_URL, {
        method:"POST",
        body: JSON.stringify({
            "trainer_id": trainer_object.id,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(resp => resp.json())
    .then(pokemon_object => {
        let listElement = document.querySelector("ul");
        renderPokemon(pokemon_object, listElement, trainer_object);
    })

}


function deletePokemon(pokemon, trainer) {
    return fetch(POKEMONS_URL+"/"+pokemon.id, {
        method:"DELETE",
    })
    .then(() => {
        let listElement = document.querySelector("ul");
        let pokemonElement = document.querySelector("li#pokemon_id" + (pokemon.id).toString(10));
        listElement.removeChild(pokemonElement);

    })

}

function renderPokemon(pokemon, listElement, trainer) {
    let liElement = document.createElement("li");
    liElement.setAttribute("id", "pokemon_id" + pokemon.id);
    liElement.textContent = pokemon.nickname + " (" + pokemon.species + ")";

    let btnPokemonRelease = document.createElement("button")
    btnPokemonRelease.textContent = "Release";
    btnPokemonRelease.setAttribute("class", "release");
    btnPokemonRelease.addEventListener("click", function(event) {
      deletePokemon(pokemon, trainer);  
    })

    liElement.append(btnPokemonRelease);
    listElement.append(liElement);
}

function renderTrainer(trainer_object) {

    let divCardElement = document.createElement("div")
    divCardElement.setAttribute("id", trainer_object.id);
    divCardElement.setAttribute("class", "card");

    let pTrainerElement = document.createElement("p");
    pTrainerElement.textContent = trainer_object.name;
    divCardElement.append(pTrainerElement);
    
    let btnElement = document.createElement("button")
    btnElement.textContent = "Add Pokemon";
    btnElement.addEventListener("click", function(event) {
        addPokemon(trainer_object);
    })
    divCardElement.append(btnElement);

    let pokemonPElement = document.createElement("p")
    divCardElement.append(pokemonPElement);

    let listElement = document.createElement("ul")
    divCardElement.append(listElement);

    let pokemons = trainer_object.pokemons;
    pokemons.forEach(pokemon => {
        renderPokemon(pokemon, listElement, trainer_object);
    })
    mainElement.append(divCardElement)
}

document.addEventListener("DOMContentLoaded", (event) => {

    getTrainerData().then(trainers => {
        trainers.forEach(trainer => {
            renderTrainer(trainer);
        })
    })

})
