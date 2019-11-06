const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded',() => {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(trainers => displayTrainers(trainers["data"]))
});

function displayTrainers(trainers) {
    trainers.forEach(trainer => {
        let trainerCard
        let addButton
        let pokemonList
        let poke
        let releaseButton

        trainerCard = document.createElement("div")
        trainerCard.classList.add("card")
        trainerCard.innerHTML = `<p>${trainer.attributes.name}</p>`

        addButton = document.createElement("button")
        addButton.classList.add("addPokemon")
        addButton.innerText = "Add Pokemon"
        addButton.addEventListener("click", (e) => {
            addToTeam(trainer);
        })

        pokemonList = document.createElement("ul")
        trainer.attributes.pokemons.forEach(pokemon => {
            poke = document.createElement("li")
            poke.innerText = `${pokemon.nickname} (${pokemon.species})`
            releaseButton = document.createElement("button")
            releaseButton.classList.add("release")
            releaseButton.innerText = "Release"
            releaseButton.addEventListener("click", (e) => {
                e.preventDefault();
                removeFromTeam(pokemon)
                e.target.parentElement.remove()
            })
            poke.appendChild(releaseButton)
            pokemonList.appendChild(poke)
        });

        trainerCard.append(addButton, pokemonList)
        document.querySelector('#trainer-list').appendChild(trainerCard)
    })
}

function addToTeam(trainer) {
    console.log(`Teammate Added to ${trainer.attributes.name}`)
}

function removeFromTeam(pokemon) {
    console.log(pokemon.nickname)
} 
