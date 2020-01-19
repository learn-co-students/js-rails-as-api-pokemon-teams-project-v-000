const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


document.addEventListener('DOMContentLoaded', () => 
    {
        getAllTrainersAndPokemons()


    }


)

function getAllTrainersAndPokemons() {

    const requestConfigs = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }

    return fetch(TRAINERS_URL, requestConfigs).then(function (response) {
        return response.json();
    }).then(function (json) {
        json.data.forEach (object => createTrainerCard(object))
            
    })

}


function createTrainerCard(obj) {
    let cardDiv = document.createElement('div')
    cardDiv.className = 'card'
    let addPkmBtn = document.createElement('button')
    let ulElem = document.createElement('ul')
    let para = document.createElement('p')
    let mainBody = document.querySelector('main')
    
    cardDiv["data-id"] = obj.id
    para.textContent = obj.attributes.name
    addPkmBtn.textContent = "Add Pokemon"
    addPkmBtn['data-trainer-id'] = obj.id
    addPkmBtn.addEventListener('click', addNewPokemon(event))
    cardDiv.appendChild(para)
    cardDiv.appendChild(addPkmBtn)
    cardDiv.appendChild(ulElem)

    let pokemons = obj.relationships.pokemons.data

    for (i = 0; i < pokemons.length; i++) {
        
        getPokemonFromApi(pokemons[i], cardDiv)
        mainBody.appendChild(cardDiv)

    }
    
    
}

function getPokemonFromApi(pokemon, cardDiv) {
    const requestConfigs = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }

    return fetch(`${POKEMONS_URL}/${pokemon.id}`, requestConfigs).then(function (response) {
        return response.json();
    }).then(function (json) {
        cardDiv.appendChild(addPokemonToList(json.data))

    })
}

function addPokemonToList(pokemon) {
    let liElem = document.createElement('li')
    let releasePkmBtn = document.createElement('button')
    releasePkmBtn.className = "release"
    releasePkmBtn.textContent = "Release"
    releasePkmBtn['data-pokemon-id'] = pokemon.id
    releasePkmBtn.addEventListener('click', removePokemon(event))
    liElem.textContent = `${pokemon.attributes.nickname} (${pokemon.attributes.species})`
    liElem.appendChild(releasePkmBtn)
    return liElem

}

function addNewPokemon(event) {
    ///this is where i will create fake pokemon data
}


function removePokemon(event) {

}