const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
let main = document.querySelector('main')

document.addEventListener("DOMContentLoaded", function() {
    
    getAllTrainers()
   
    // .then(trainers => {
    //   trainers.forEach(trainer => {
    //     postTrainer(trainer)
        
    //   })
    // })
  
  });

  function getAllTrainers() {
    fetch('http://localhost:3000/trainers')
    .then(response => response.json())
    .then(jsonTrainers => renderTrainers(jsonTrainers))
  }
  
  function renderTrainers(jsonTrainers) {
    for (trainer of jsonTrainers){
      postTrainer(trainer)
    }
  }

  function postTrainer(trainer) {

    const div = document.createElement('div')
    div.setAttribute('class', 'card')
    div.setAttribute('data-id', `${trainer.id}`)
    main.append(div)
    
    const p = document.createElement('p')
    p.innerText = trainer.name
    div.append(p)

    const btn = document.createElement('button')

    btn.setAttribute('trainer-id', `${trainer.id}`)
    btn.innerText = 'Add Pokemon'
    div.append(btn)

   
    
    const ul = document.createElement('ul')
    div.append(ul)

    renderPokemon(trainer)
    
    function renderPokemon(trainer) {
      const li = document.createElement('li')
      
      // const pokemon = trainer.pokemons.shift()

      for (pokemon of trainer.pokemons){
        let dBtn = document.createElement('button')
        dBtn.innerText = 'Remove Pokemon'
        li.append(pokemon.nickname)  
        li.append(dBtn)
        ul.append(li)
        
      }
      
    }
    
    
    

    function removePokemon(pokemon) {
      
      console.log(pokemon.nickname)
     
      // pokemon.splice(index, `${pokemon.id}`)
    }

    

  }
