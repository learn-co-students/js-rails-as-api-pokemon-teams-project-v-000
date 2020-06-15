const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function(e) {
    fetchTrainers();
})

// show all the trainers and their teams
// fetch trainers
function fetchTrainers() {
    return fetch (TRAINERS_URL)
    .then(response => response.json())
    .then(json => renderTeams(json))
    }

function renderTeams(trainers) {
    trainers.data.forEach(trainer => {
        renderTeam(trainer);
    })
}

// building the div that each team lives in

function renderTeam(trainer) {
    //console.log(trainer)

    const main = document.querySelector('main')
    const div = document.createElement('div')
    div.className = 'card'
    div.setAttribute('data-id', `${trainer.id}`)

    const p = document.createElement('p')
    p.innerHTML = trainer.name

    const addPokemonButton = document.createElement('button')
    addPokemonButton.innerHTML = 'Add Pokemon'
    addPokemonButton.setAttribute('data-trainer-id', `${trainer.id}`)
    addPokemonButton.addEventListener("click", function(e) {
        addPokemon(trainer.id);
    })

    div.append(p, addPokemonButton)

    const ul = document.createElement('ul')

    trainer.pokemons.forEach(pokemon => {
        ul.append(renderPokemon(pokemon));
    })

    div.appendChild(ul)
    main.appendChild(div)
    
}

// renderPokemon function

function renderPokemon(pokemon) {
    const li = document.createElement('li')

    const releasePokemonButton = document.createElement('button')
    releasePokemonButton.className = 'release'
    releasePokemonButton.innerHTML = 'Release'
    releasePokemonButton.setAttribute("date-pokemon-id", `${pokemon.id}`)
    releasePokemonButton.addEventListener("click", function(e) {
        releasePokemon(pokemon)
    })

    li.innerHTML = `${pokemon.nickname} (${pokemon.species})`
    li.append(releasePokemonButton);
    return li;
}


// addPokemon function

function addPokemon(trainer_id) {
    const ul = document.querySelector(`[data-id="${trainer_id}"] ul`)

    if (ul.childElementCount < 6) {
        fetch(POKEMONS_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                trainer_id
            })
        })
        .then(response => response.json())
        .then(json => {
            const li =renderPokemon(json.pokemon)
            ul.appendChild(li)
        })
    }
}

// releasePokemon function

function releasePokemon(pokemon) {
    const li = document.querySelector(`[data-id="${pokemon.trainer_id}"] ul li [data-pokemon-id="${pokemon.id}"]`).parentNode

    fetch(`${POKEMONS_URL}/${pokemon.id}`, {
        method: "DELETE"
    })
    .then(response => li.parentNode.removeChild(li))
}