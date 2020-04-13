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

function createPokemon(trainerId){
    return fetch(POKEMONS_URL, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'trainer_id': trainerId
        })
      })
      .then(res => res.json())
}

function releasePokemon(pokemonId){
    return fetch(`${POKEMONS_URL}/${pokemonId}`, {
        method: "DELETE"
    })
    .then(res => res.json())
}

function renderLi(trainer){
    trainer.attributes.pokemons.forEach(pokemon => {
        let releaseBtn = document.createElement("button")
        releaseBtn.setAttribute('class', 'release')
        releaseBtn.setAttribute('data-pokemon-id', pokemon.id)
        releaseBtn.innerText = "Release"
        releaseBtn.addEventListener('click', handleButton)
        
        let li = document.createElement('li')
        li.innerText = pokemon.nickname + " ("+ pokemon.species +")"
        li.append(releaseBtn)
    })
}

function renderCard(trainer){ 
    let trainerName = document.createElement('p')   
    trainerName.innerText = trainer.attributes.name
    
    let addBtn = document.createElement("button")
    addBtn.setAttribute('data-trainer-id', trainer.id)
    addBtn.innerText = "Add Pokemon"
    addBtn.addEventListener('click', handleButton)
  
    let ul = document.createElement('ul')

    trainer.attributes.pokemons.forEach(pokemon => {  
        let releaseBtn = document.createElement("button")
        releaseBtn.setAttribute('class', 'release') 
        releaseBtn.setAttribute('data-pokemon-id', pokemon.id)
        releaseBtn.innerText = "Release"
        releaseBtn.addEventListener('click', handleButton)
        let li = document.createElement('li')
        li.innerText = pokemon.nickname + " ("+ pokemon.species +")"
        li.append(releaseBtn);
        ul.appendChild(li);
    })
    
    let divCard = document.createElement("div")
    divCard.setAttribute('class', 'card')
    divCard.dataset.id = trainer.id
    divCard.append(trainerName, addBtn, ul)
    document.querySelector("main").append(divCard)
}

function handleButton(event){
    if (event.target.tagName == "button"){
        switch(event.target.innerText){
            case 'Add Pokemon':
                createPokemon(parseInt(event.target.dataset.trainerId))
                .then(pokemon => {
                if(!pokemon.error){
                    let pokemonList = document.querySelector(`div[data-id='${pokemon["trainer_id"]}'] > ul`)
                    pokemonList.innerHTML += `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
                }
                })
            break;
            case 'Release':
                let pokemonId = parseInt(event.target.dataset.pokemonId)
                event.target.parentNode.remove()
                releasePokemon(pokemonId)
            break;
        }
    }
}
