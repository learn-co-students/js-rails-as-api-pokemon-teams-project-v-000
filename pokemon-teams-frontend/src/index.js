const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function () {
    fetchTrainers();
});

function fetchTrainers(){
    return fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(results => {
        results.data.forEach(trainer => renderCard(trainer));
    })
}

function createPokemon(){
    return 
}

function renderCard(trainer){ 
    let trainerName = document.createElement('p')   
    trainerName.innerText = trainer.attributes.name
    
    let addBtn = document.createElement("button")
    addBtn.setAttribute('data-trainer-id', trainer.id)
    addBtn.innerText = "Add Pokemon"
    addBtn.addEventListener('click', function(event){
            fetch(POKEMONS_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    "id": `${trainer.id}`
                })
            })
            .then(response => response.json())
            .then(function(poke){
                let pokemonList = document.querySelector(`div[data-id='${trainer.id}'] > ul`)
                let li = document.createElement('li')
                li.innerText = poke.nickname + " ("+ poke.species +")"
                let releaseBtn = document.createElement("button")
                releaseBtn.setAttribute('class', 'release') 
                releaseBtn.setAttribute('data-pokemon-id', poke.id)
                releaseBtn.innerText = "Release"
                releaseBtn.addEventListener('click', function(event){
                    fetch(POKEMONS_URL +`/${poke.id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-type": "application/json",
                            "Accept": "application/json"
                        }
                    })
                    event.target.parentNode.remove()
                })
                li.append(releaseBtn);
                pokemonList.appendChild(li)
            })
    })
  
    let ul = document.createElement('ul')

    trainer.attributes.pokemons.forEach(pokemon => {  
        let releaseBtn = document.createElement("button")
        releaseBtn.setAttribute('class', 'release') 
        releaseBtn.setAttribute('data-pokemon-id', pokemon.id)
        releaseBtn.innerText = "Release"
        releaseBtn.addEventListener('click', function(event){
            fetch(POKEMONS_URL +`/${pokemon.id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                    "Accept": "application/json"
                }
            }).then(res => res.json())
            event.target.parentNode.remove()
        })
        let li = document.createElement('li')
        li.innerText = pokemon.nickname + " ("+ pokemon.species +")"
        li.append(releaseBtn);
        ul.appendChild(li);
    })
    
    let divCard = document.createElement("div")
    divCard.setAttribute('class', 'card')
    divCard.setAttribute('data-id', trainer.id)
    divCard.append(trainerName, addBtn, ul)
    document.querySelector("main").append(divCard)
}


