const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainBody = document.querySelector("main")

document.addEventListener("DOMContentLoaded", () => {
    getTrainers();

})

function getTrainers(){
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => json.forEach(trainer => renderTrainers(trainer)))
}

function renderTrainers(trainer){
    const div = document.createElement("div") 
    const p = document.createElement("p") 
    const button = document.createElement("button") 
    const ul = document.createElement("ul") 

    div.setAttribute("class", "card")
    div.setAttribute("data-id", trainer.id)
    p.innerHTML= trainer.name 
    button.setAttribute("data-trainer-id", trainer.id)
    button.innerHTML = "Add Pokemon"
    button.addEventListener("click", addPokemon)

    mainBody.appendChild(div)
    div.appendChild(p) 
    div.appendChild(button) 
    div.appendChild(ul)

    trainer.pokemons.forEach(pokemon => renderPokemon(pokemon))
}
    function renderPokemon(pokemon){
        const ul = document.querySelector(`div[data-id="${pokemon.trainer_id}"]`)
        const li = document.createElement("li")
        const button = document.createElement("button")

        li.innerHTML = `${pokemon.nickname} (${pokemon.species})`
        button.setAttribute("class", "release") 
        button.setAttribute("data-pokemon-id", pokemon.id)
        button.innerHTML = "Release"
        button.addEventListener("click", deletePokemon)

        li.appendChild(button) 
        ul.appendChild(li) 
    }

function addPokemon(event){
    event.preventDefault();
    fetch(POKEMONS_URL, {
        method: "POST", 
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json"
          },
        body: JSON.stringify({trainer_id: event.target.dataset.trainerId})
    })
    .then(resp => resp.json())
    .then(json => {
        if (json.message){
            alert(json.message)
        }
        else {
        renderPokemon(json)
        }
    })
} 

function deletePokemon(event){
    event.preventDefault();
    fetch(`POKEMONS_URL/${event.toElement.dataset.pokemonId}`, {
        method: "DELETE", 
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json"
          }
    })
    event.target.parentElement.remove()
}

