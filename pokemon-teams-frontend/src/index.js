const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


document.addEventListener('DOMContentLoaded', () => {
  fetch(TRAINERS_URL)
  .then((resp) => (resp.json()))
  .then((trainers) => {
    for(let trainer of trainers) {
      createTrainerCard(trainer)
    }
  })

  function createTrainerCard(trainer) {
    const main = document.getElementsByTagName('main')[0]
    let div = document.createElement('div')
    div.className = 'card'
    div.setAttribute('data-id', trainer.id)

    let p = document.createElement('p')
    p.innerText = trainer.name
    div.appendChild(p)

    let button = document.createElement('button')
    button.innerText = 'Add Pokemon'
    button.setAttribute('data-trainer-id', trainer.id)
    createAddPokemonEvent(button)
    div.appendChild(button)

    let ul = document.createElement('ul')

    for(pokemon of trainer.pokemons) {
      createPokemonItem(pokemon, ul)
    }

    div.appendChild(ul)
    main.appendChild(div)
  }

  function createPokemonItem(pokemon, ul) {
    let li = document.createElement('li')
    li.innerText = `${pokemon.nickname} (${pokemon.species})`

    let button = document.createElement('button')
    button.innerText = 'Release'
    button.className = 'release'
    button.setAttribute('data-pokemon-id', pokemon.id)
    createReleasePokemonEvent(button)

    li.appendChild(button)

    ul.appendChild(li)
  }

  function createAddPokemonEvent(button) {
    button.addEventListener('click', function(e) {
      let trainerId = parseInt(button.getAttribute('data-trainer-id'), 10)

      const configurationObject = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "trainer_id": trainerId
        })
      }

      // add logic to only add pokemon if there are less than 6
      let trainerCard = document.querySelectorAll(`[data-id="${trainerId}"]`)[0]
      let ul = trainerCard.getElementsByTagName('ul')[0]

      if (ul.childElementCount < 6) {
        fetch(POKEMONS_URL, configurationObject)
        .then(function(resp) {
          return resp.json()
        })
        .then(function(pokemon) {
          createPokemonItem(pokemon, ul)
        })
      }
    })
  }

  function createReleasePokemonEvent(button) {
    button.addEventListener('click', function(e) {
      let pokemonId = parseInt(button.getAttribute('data-pokemon-id'), 10)

      let configurationObject = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      }

      fetch(`${POKEMONS_URL}/${pokemonId}`, configurationObject)
      .then(function(resp) {
        return resp.json()
      })
      .then(function(object) {
        button.parentElement.remove()
      })

    })
  }

})
