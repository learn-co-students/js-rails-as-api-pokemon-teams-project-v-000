const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

//fetch trainers
//createelements: div, button, ul, li

fetch(TRAINERS_URL)
.then(response => response.json())
.then(trainers => {          
    trainers.forEach(trainer => {
        const trainerCard = document.createElement('div')
        trainerCard.className = 'card'
        
        const p = document.createElement('p')
        p.innerHTML = trainer.name
        trainerCard.appendChild(p)

        const addButton = document.createElement('button')
        addButton.innerHTML = 'Add Pokemon'
        trainerCard.appendChild(addButton)

        const releaseButton = document.createElement('button')
        releaseButton.className = 'release'
        releaseButton.innerHTML = 'Release'

        const ul = document.createElement('ul')
        const li = document.createElement('li')
        li.innerText = 'poke'
        li.appendChild(releaseButton)

        ul.appendChild(li)
        

        trainerCard.appendChild(ul)

        document.querySelector('main').appendChild(trainerCard)
    });

})
  
