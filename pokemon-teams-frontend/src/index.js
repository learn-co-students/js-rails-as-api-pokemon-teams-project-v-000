const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

window.addEventListener('DOMContentLoaded', (event) => {
    let main = document.querySelector("main")
    fetchTrainers(main)
    
});


const fetchTrainers = (main) => {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(trainers => renderTrainers(main, trainers))
}

const renderTrainers = (main, trainers) => {
    trainers.forEach(trainer => {
        renderTrainer(main, trainer)
    });
}

const renderTrainer = (main, trainer) => {
    const trainerDiv = document.createElement("div")
    trainerDiv.className = "card"
    trainerDiv.dataset.id = trainer.id
    const trainerNameP = document.createElement("p")
    trainerNameP.innerText = trainer.name
    trainerDiv.append(trainerNameP)
    const addPokemonBtn = document.createElement("button")
    addPokemonBtn.innerText = "Add Pokemon"
    addPokemonBtn.dataset.trainerId = trainer.id
    trainerDiv.append(addPokemonBtn)
    const pokemonUl = document.createElement("ul")
    trainer.pokemons.forEach(pokemon => {
        renderPokemon(pokemon, pokemonUl)
    })
    trainerDiv.append(pokemonUl)
    handleAddPokemon(addPokemonBtn, pokemonUl)
    main.append(trainerDiv)
}

const renderPokemon = (pokemon, ul) => {
    const pokemonLi = document.createElement("li")
    pokemonLi.innerText = `${pokemon.nickname} (${pokemon.species})`
    const releaseButton = document.createElement("button")
    releaseButton.innerText = "Release"
    releaseButton.className = "release"
    releaseButton.dataset.pokemonId = pokemon.id
    handleRemovePokemon(releaseButton)
    pokemonLi.append(releaseButton)
    ul.append(pokemonLi)
}

const handleAddPokemon = (button, ul) => {
    button.addEventListener("click", (e) => {
        if(e.target.nextSibling.children.length < 6){
            fetchPokemon(ul, e.target.dataset.trainerId)
        }
        else{
            alert("A trainer may only have 6 Pokemon.")
        }

    })
}

const fetchPokemon = (ul, trainerId) => {
    let pokemonObj = {
        trainer_id: trainerId
    }
    let trainerConfig = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(pokemonObj)
    }
    fetch(POKEMONS_URL, trainerConfig)
    .then(resp => resp.json())
    .then(pokemon => renderPokemon(pokemon, ul))
}

const handleRemovePokemon = (button) => {
    button.addEventListener("click", (e) => {
        let url = POKEMONS_URL + "/" + e.target.dataset.pokemonId.toString()
        fetch(url, {
            method: "DELETE",
        })
        .then(resp => resp.json())
        .then(json => removePokemon(json.message, e.target.parentElement))
    })
}

const removePokemon = (message, li) => {
    li.remove()
    // alert(message)
}