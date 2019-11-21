const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function() {
    fetchTrainers();
})

function fetchTrainers() {
    return fetch(TRAINERS_URL)
        .then(res => res.json())
        .then(data => { createTrainers(data) })
}

function createTrainers(data) {
    data.forEach(trainer => renderTrainer(trainer))
    
}

function renderTrainer(trainer) {
    const main = document.querySelector('main')

    const div = document.createElement('div')
    div.setAttribute("class", "card")
    div.setAttribute("data-id", `${trainer.id}`)

    const p = document.createElement('p')
    p.innerHTML = `${trainer.name}`
    div.appendChild(p)

    const addbtn = document.createElement('button')
    addbtn.setAttribute("data-trainer-id", `${trainer.id}`)
    addbtn.innerHTML = "Add Pokemon"
    addbtn.addEventListener('click', morePokemon)
    div.appendChild(addbtn)

    const ul = document.createElement('ul')
    div.appendChild(ul)

    trainer.pokemons.forEach(pokemon => {

        let li = createPokemon(pokemon);

        ul.appendChild(li);
    })

    main.appendChild(div)
}

function morePokemon(e) {
    if (e.target.nextSibling.childElementCount < 6) {
        fetchPokemon(e.target.attributes[0].value)
    }

}

function fetchPokemon(trainer_id) {

    let trainerObj = {
        "trainer_id": trainer_id
    }

    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(trainerObj)
    };

    fetch(POKEMONS_URL, configObj)
        .then(res => res.json())
        .then(obj => renderPokemon(obj))
}

function renderPokemon(obj) {
    
    const trainerDiv = document.querySelector(`[data-id="${obj.trainer.id}"] ul`)

    let li = createPokemon(obj)

    trainerDiv.appendChild(li)
}

function createPokemon(obj) {
    const li = document.createElement('li')

    li.innerHTML = `${obj.nickname} (${obj.species})`

    let relbtn = document.createElement('button')

    relbtn.setAttribute("class", "release")
    relbtn.setAttribute("data-pokemon-id", `${obj.id}`)
    relbtn.innerHTML = "Release"
    relbtn.addEventListener('click', destroyPokemon)
    li.appendChild(relbtn)

    return li;
}

function destroyPokemon(element) {
    
    let pokemonObj = {
        "id": element.target.attributes[1].value
    }

    let configObj = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pokemonObj)
    };

    fetch(POKEMONS_URL + `/${pokemonObj.id}`, configObj)
        .then(res => res.json())
        .then(obj => removePokemon(obj))
}

function removePokemon(obj) {
    const trainerDiv = document.querySelector(`[data-id="${obj.trainer.id}"] ul li [data-pokemon-id="${obj.id}"]`)
    
    trainerDiv.parentNode.remove();
}