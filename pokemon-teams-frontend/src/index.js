const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function fetchTrainers() {
    return fetch(TRAINERS_URL)
      .then(resp => resp.json())
      .then(json => renderTrainers(json))
  }
  
  function renderTrainers(trainers) {
    const main = document.querySelector('main')
    trainers.forEach(trainer => {
      const div = document.createElement('div')
      div.className = "card"
      div.dataset.id = trainer.id
      
      const t_name = document.createElement('p')
      t_name.innerText = trainer.name
      
      div.appendChild(t_name)
      
      const button1 = document.createElement('button')
      button1.dataset.trainerId = trainer.id
      button1.innerText = 'Add pokemon'
      
      div.appendChild(button1)

      const ul = document.createElement('ul')
      const pokemons=trainer.pokemons

      pokemons.forEach(pokemon =>{
          const li = document.createElement('li')
          li.innerHTML += `${pokemon.nickname} (${pokemon.species})`
          
          const button = document.createElement('button')
          button.className = 'release'
          button.dataset.pokemonId = pokemon.id
          button.innerHTML = 'Release'
          
          li.appendChild(button)
          ul.appendChild(li)
      })

      div.appendChild(ul)

      main.appendChild(div)
    })
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    fetchTrainers()
  })

  document.addEventListener('click')
