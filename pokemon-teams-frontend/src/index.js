const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
let main = document.querySelector('main')

document.addEventListener("DOMContentLoaded", function() {
    
    getAllTrainers()
    
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

    btn.setAttribute('data-trainer-id', `${trainer.id}`)
    btn.innerText = 'Add Pokemon'
    div.append(btn)
    const ul = document.createElement('ul')
    div.append(ul)
    btn.addEventListener("click", () => {
      addPokemon(trainer.id)
    })
    renderPokemon(trainer)
    
    function renderPokemon(trainer) {
    
      for (pokemon of trainer.pokemons){
        const li = document.createElement('li')
        const dBtn = document.createElement('button')
        dBtn.setAttribute("class", "release")
        dBtn.innerText = 'Release'
        li.append(pokemon.nickname)  
        li.append(dBtn)
        ul.append(li)
         let test = {...pokemon} //spread operator making a non referencing copy or clone that does not destroy original
        dBtn.addEventListener("click", () => {
          removePokemon(test, trainer)
        })
      }
      
    }

    function addPokemon(trainerId){
      fetch(`${TRAINERS_URL}/${trainerId}`)
      .then(results => results.json())
      .then(trainer => {
        if (trainer.pokemons.length < 6){
          fetch(`${POKEMONS_URL}`, {
            method: "POST",
            headers: {

              "Content-Type": "application/json",
              "Accept": "application/json"
      
            },
    
            body: JSON.stringify({
              "trainer_id": trainer.id
              
            })
            })
          .then(results => results.json())
          .then(data => {
            console.log(data)
          })
        }
      })
    }

    function removePokemon(pokemon, trainer) {
      console.log(pokemon)
      fetch(`${POKEMONS_URL}/${pokemon.id}`, {
        method: "DELETE"
        })
      .then(results => results.json())
      .then(data => {
        console.log(data)
      })
      
    }
    
    
    // function removePokemon(pokemon, trainer) {
    //   console.log(pokemon.nickname)
    //   console.log(trainer)
    //   let idx = trainer.pokemons.indexOf("pokemon.nickname")
    //   if (idx != -1) trainer.pokemons.splice(idx, 1)
    //   debugger
    // }

    

  }
