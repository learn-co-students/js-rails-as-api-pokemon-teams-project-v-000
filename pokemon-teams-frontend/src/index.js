const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function() {
    getTrainers()
})

function getTrainers() {
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(trainers => {
         for(trainer of trainers) {
            createCard(trainer);
         }
    })
}

function createCard(trainer) {
    let pokemonDiv = document.createElement("div")
    let name = document.createElement("p")
    let button = document.createElement("button")
    let trpoks = trainer.pokemons
    let list = document.createElement("ul")
    let main = document.body.children[1]
    
    pokemonDiv.setAttribute("class", "card")
    pokemonDiv.setAttribute("data-id", `${trainer.id}`);
    name.innerText = trainer.name
    button.setAttribute("class", "add")
    button.addEventListener("click", createPokemon)
    button.dataset.trainer_id = trainer.id
    button.innerText = "Add Pokemon"
    list.setAttribute("data-id",`${trainer.id}`)

    pokemonDiv.appendChild(name)
    pokemonDiv.appendChild(button)
    pokemonDiv.appendChild(list)
    main.appendChild(pokemonDiv)

    for(pok of trpoks) {
        renderPokemon(pok, list)
    }
}

function renderPokemon(pok, list) {
    let li = document.createElement("li")
    let liButton = document.createElement("button")

    li.innerText = `${pok.nickname} (${pok.species})`
    liButton.setAttribute("class", "release")
    liButton.setAttribute("data-pokemon-id",(`${pok.id}`) )
    liButton.addEventListener("click", removePokemon)
    liButton.innerText = "Release"

    li.appendChild(liButton)
    list.appendChild(li)
}

function createPokemon() {
    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "trainer_id": event.target.dataset.trainer_id, 
        })
    }
    fetch(POKEMONS_URL, configObj)
    .then(response => response.json())

    .then(pokemon => {
        if(pokemon.message) {
            alert(pokemon.message)
        }
        else {
            let list = document.querySelector(`ul[data-id="${pokemon.trainer_id}"]`)
            renderPokemon(pokemon, list)
        }
    })
}


function removePokemon() {
    const configObj = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
    }
    fetch(`${POKEMONS_URL}/${event.target.dataset.pokemonId}`, configObj)
    event.target.parentElement.remove()
}

