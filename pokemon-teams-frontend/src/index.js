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
          button.addEventListener('click', function(event){
            fetch(`http://localhost:3000/pokemons/${pokemon.id}`, {
              method: "DELETE"
            })
            ul.removeChild(li)
          })
          
          li.appendChild(button)
          ul.appendChild(li)
      })

      button1.addEventListener('click',function(event){
        fetch("http://localhost:3000/pokemons", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            trainer_id: trainer.id
          })
        })
        .then(function(response) {
          return response.json();
        })
        .then(function(pokemon) {
          const li = document.createElement('li')
          li.innerHTML += `${pokemon.nickname} (${pokemon.species})`
          
          const button = document.createElement('button')
          button.className = 'release'
          button.dataset.pokemonId = pokemon.id
          button.innerHTML = 'Release'
          button.addEventListener('click', function(event){
            fetch(`http://localhost:3000/pokemons/${pokemon.id}`, {
              method: "DELETE"
            })
            ul.removeChild(li)
          })
          
          li.appendChild(button)
          if(pokemon.id!=null){
            ul.appendChild(li)
          }
        
        });
      });


      div.appendChild(ul)

      main.appendChild(div)
    })
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    fetchTrainers()
  })

  
