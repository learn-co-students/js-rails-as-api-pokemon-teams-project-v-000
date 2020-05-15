const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', () => renderTrainers())

function renderTrainers() {
    fetch(TRAINERS_URL)
        .then(res => res.json())
        .then((json) => {
            json.forEach((trainer) => {
                setTrainerCard(trainer)
            })
        })
}

function setTrainerCard(trainer) {
    const div = document.createElement("div")
    const p = document.createElement("p")
    const button = document.createElement("button")
    const ul = document.createElement("ul")

    div.setAttribute("class", "card")
    div.setAttribute("data-id", trainer.id)
    button.setAttribute("data-trainer-id", trainer.id)
    button.addEventListener("click", (e) =>addPokemonToTeam(e))
    button.innerText = "Add Pokemon"
    div.appendChild(p)
    div.appendChild(button)
    p.innerText = trainer.name
    trainer.pokemons.forEach((pokemon) =>{
        ul.appendChild(renderPokemon(pokemon))
    })
    div.appendChild(ul)

    document.querySelector("main").append(div)
}

function addPokemonToTeam(e) {
    e.preventDefault()
    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({trainer_id: e.target.parentElement.dataset.id})
    }

    fetch(POKEMONS_URL, configObj)
        .then(res => res.json())
        .then(json => {
            if (json.hasOwnProperty('error')) {
                alert(json.error)
            } else {
                const ul = document.querySelector(`div[data-id="${json.trainer_id}"]`)
                ul.appendChild(renderPokemon(json))
            }
               
           }
        )
}

function removePokemon(e) {
    e.preventDefault()
    const configObj = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
    }

    fetch(`${POKEMONS_URL}/${e.target.dataset.pokemonId}`, configObj)
        .then( 
            e.target.parentNode.remove()
            )
}

function renderPokemon(pokemon) {
    const li = document.createElement("li")
    const button = document.createElement("button")

    li.innerText = `${pokemon.nickname} (${pokemon.species})`
    button.setAttribute("class", "release")
    button.setAttribute("data-pokemon-id", pokemon.id)
    button.innerText = "Release" 
    button.addEventListener("click", (e) =>removePokemon(e))

    li.appendChild(button)
    
    return li
}

