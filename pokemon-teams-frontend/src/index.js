const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
let dataIdCounter = 1

// --------------------------------------------------------------------
// right now im manually doing everything, but up here should be an 
// event listener that waits for DOM content to be loaded before calling 
// the asynchronous functions. 
function createPokemonCards() {
    fetch('http://localhost:3000/trainers')
        .then(response => response.json())
        .then(result => createCards(result))
};


function createCards(result) {
    let mainBody = document.querySelector("main")

    for (const trainer of result) {
        let cardDiv = createEmptyCardDiv();
        populateCard(cardDiv, trainer)
        mainBody.appendChild(cardDiv);
    }
}


function createEmptyCardDiv() {
    let divEl = document.createElement("div");
    divEl.className = "card";
    divEl.setAttribute("data-id", dataIdCounter);
    dataIdCounter++;

    return divEl;
}


function populateCard(card, trainer) {
    let p = document.createElement("p");
    p.innerHTML = trainer.name;
    card.appendChild(p)

    let addPokemonButton = document.createElement("button")
    addPokemonButton.setAttribute("data-trainer-id", trainer.id)
    addPokemonButton.innerHTML = "Add Pokemon"
    addPokemonButton.addEventListener("click", event => requestPokemon(event.target))

    card.appendChild(addPokemonButton)

    let pokemonList = document.createElement("ul")
    let pokemonTeam = trainer["pokemons"]

    for(const pokemon of pokemonTeam) {
        
        let liEl = document.createElement("li")
        liEl.innerHTML = `${pokemon["nickname"]} (${pokemon["species"]})`
        let pokemonReleaseButton = document.createElement("button")
        pokemonReleaseButton.className = "release"
        pokemonReleaseButton.setAttribute("data-pokemon-id", pokemon["id"])
        pokemonReleaseButton.innerHTML = "Release"
        liEl.appendChild(pokemonReleaseButton)
        pokemonList.appendChild(liEl)
    }
    card.appendChild(pokemonList)
}


function requestPokemon(target) {
    console.log("Add pokemon event listener is passing on the message to requestPokemon(target)")
    console.log(target)

    let trainerId = target.getAttribute("data-trainer-id")
    
    
    let configObj = {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
        body: JSON.stringify({ "trainer_id": trainerId })
    };
    
    fetch("http://localhost:3000/pokemons", configObj)
        .then(response => console.log(response))
}











