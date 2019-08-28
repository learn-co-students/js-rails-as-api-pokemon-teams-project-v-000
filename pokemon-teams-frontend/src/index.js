const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function renderTrainers(trainers) {
    trainers.forEach(trainer => {
        const trainerCard = generateTrainerCard(trainer)         
        document.querySelector('main').appendChild(trainerCard)
    })
}

function generatePokemonLi(pokemon) {
    const li = document.createElement('li')
    li.innerText = pokemon.id
    // debugger
    const releaseButton = document.createElement('button')
    releaseButton.className = 'release'
    releaseButton.innerHTML = 'Release' 
    //add listener, onlick, DEL /pokemons, rerender pokemon list, or grab parentLi & remove
    releaseButton.addEventListener('click', ()=>{  
        console.log(pokemon)
        // debugger                
        fetch(POKEMONS_URL + '/' + pokemon.id,  {
            method: 'DELETE', // or 'PUT'
            // body: JSON.stringify({"trainer_id": trainer.id} ), 
            headers:{
              'Content-Type': 'application/json',
              Accept: "application/json"
            }
          })
        .then(response => response.json())
        .then(pokemon => {          
               //add pokemon to DOM                    
               
        });
    })
    li.appendChild(releaseButton)

    return li
}

function generateTrainerCard(trainer) {
        const trainerCard = document.createElement('div')
        trainerCard.className = 'card'
        
        const p = document.createElement('p')
        p.innerHTML = trainer.name
        trainerCard.appendChild(p)

        const addButton = document.createElement('button')
        addButton.innerHTML = 'Add Pokemon'

        //add listener, onlick, POST /pokemons, generate li, append to ul
        addButton.addEventListener('click', ()=>{                       
            fetch(POKEMONS_URL,  {
                method: 'POST', // or 'PUT'
                body: JSON.stringify({"trainer_id": trainer.id} ), 
                headers:{
                  'Content-Type': 'application/json',
                  Accept: "application/json"
                }
              })
            .then(response => response.json())
            .then(pokemon => {          
                   //add pokemon to DOM                    
                   const pokemonLi = generatePokemonLi(pokemon)
                   ul.appendChild(pokemonLi)
            });
        })
        trainerCard.appendChild(addButton)
 
        const ul = document.createElement('ul')
        trainer.pokemons.forEach(pokemon => {
            const li = generatePokemonLi(pokemon)
            ul.appendChild(li)
        });
      
        trainerCard.appendChild(ul)
        return trainerCard
}

document.addEventListener('DOMContentLoaded', function () {
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(trainers => {          
            renderTrainers(trainers)
    });
})




