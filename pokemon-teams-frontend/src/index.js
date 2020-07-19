onst BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
document.addEventListener("DOMContentLoaded", () => {
    loadTrainers()
});

function loadTrainers() {
    fetch(TRAINERS_URL)
        .then(resp => resp.json())
        .then(trainers => renderTrainers(trainers))
}

function renderTrainers(objects) {
    const mainContainer = document.querySelector("main")
    objects.forEach(trainer => {
        const divCard = document.createElement('div')
              divCard.className = "card"
              divCard.setAttribute('data-id', trainer.id)

        const p = document.createElement('p')
              p.innerText = trainer.name

        const addPokeBtn = document.createElement('button')
              addPokeBtn.setAttribute('data-trainer-id', trainer.id)
              addPokeBtn.innerText = "Add Pokemon"
              addPokeBtn.addEventListener("click", (event) => {
                event.preventDefault()
                addPokemon(trainer.id)
              })
              
        divCard.appendChild(p)
        divCard.appendChild(addPokeBtn)

        const hasPokemon = (trainer.pokemons.length >= 1 ? true : false)

        if (hasPokemon) {
            const pokeUl = document.createElement("ul")

            trainer.pokemons.forEach(pokemon => {
                pokeUl.appendChild(listPokemon(pokemon))
            })
            divCard.appendChild(pokeUl)
        }
        mainContainer.appendChild(divCard)
    })
}

function listPokemon(poke) {
    const li = document.createElement("li")
          li.innerText = `${poke.nickname} (${poke.species})`
    const releaseBtn = document.createElement("button")
          releaseBtn.className = "release"
          releaseBtn.innerText = "Release"
          releaseBtn.setAttribute('data-pokemon-id', poke.id)
          releaseBtn.addEventListener("click", (event) => { 
            event.preventDefault()
            releasePokemon(event, poke.id) 
          })
          li.appendChild(releaseBtn)

    return li
}

function releasePokemon(e, id) {
    console.log(`The pokemon's id that will be released is ${id}`)
    const req = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }

    fetch(POKEMONS_URL+`/${id}`, req)
        .then(() => {
            e.target.parentNode.remove()
        })

}

function addPokemon(trainerId) {
    const req = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({trainer_id: trainerId})
    }

    fetch(POKEMONS_URL, req)
    .then(resp => resp.json())
    .then(pokemon => {
        console.log(`Adding Pokemon for trainer with id ${trainerId}`)
        if (pokemon.message) {
            throw Error(pokemon.message)
        } else {
            const cardDiv = document.querySelector(`[data-id="${trainerId}"]`);
                  cardDiv.querySelector("ul").appendChild(listPokemon(pokemon))
        }
    })
    .catch(error => console.log(error))
}
