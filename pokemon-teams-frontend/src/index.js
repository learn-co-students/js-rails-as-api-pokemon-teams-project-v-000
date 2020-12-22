const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', () => {

    let main = document.querySelector('#main')
    main.innerHTML = ""

    fetch('http://localhost:3000/trainers')
    .then(resp => resp.json())
    .then(mess => displayTrainers(mess))

    function displayTrainers(mess) {
        const trainers = mess['data']
        
        for (let trainer of trainers) {
            let pokemonsOfTrainer = trainer.attributes.pokemons 

            // add card within main
            const card = document.createElement('div')
            main.appendChild(card)
            card.classList.add("card")
            card.id = trainer.id 

            //add trainer name within card
            const trainerName = document.createElement('p') 
            card.appendChild(trainerName)
            trainerName.innerText = trainer.attributes.name

            //add 'Add Pokemon' button within card
            const addPokemon = document.createElement('button')
            card.appendChild(addPokemon)
            addPokemon.innerText = "Add Pokemon" 
            addPokemon.id = trainer.id

            //add Event Listener to 'Add Pokemon' button
            addPokemon.addEventListener('click', () => {
                if (pokemonsOfTrainer.length < 6) {
                    console.log('hello')
                }
            })

            //add ul within card
            const ul = document.createElement('ul')
            card.appendChild(ul)
            
            pokemonsOfTrainer.forEach(pokemon => {
                //add pokemon li within ul
                const pokemonLine = document.createElement('li')
                ul.appendChild(pokemonLine)
                pokemonLine.innerText = `${pokemon.species} (${pokemon.nickname})`

                //add button within li
                const buton = document.createElement('button')
                pokemonLine.appendChild(buton)
                buton.classList.add("release")
                buton.innerText = "Release"
                buton.id = pokemon.id

                //add Event Listener to 'Release' button
                buton.addEventListener('click', () => {
                    fetch(`http://localhost:3000/pokemons/${pokemon.id}`, {
                        method: "DELETE"
                    })
                })
            }) 
        }
    }

    
})