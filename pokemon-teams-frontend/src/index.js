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

            //add ul within card
            const ul = document.createElement('ul')
            card.appendChild(ul)

            
            pokemonsOfTrainer.forEach(pokemon => {
                //add pokemon li within ul
                const pokemonLine = document.createElement('li')
                ul.appendChild(pokemonLine)
                pokemonLine.innerText = `${pokemon.species} (${pokemon.nickname})`
                pokemonLine.id = pokemon.id //needed for line 70 (only item with pokemon id)

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
                    //response is deleted pokemon 
                    .then(resp => resp.json())
                    .then(deletedPokemon => {
                        const pokemonLi = document.getElementById(`${deletedPokemon.data.attributes.id}`) //from line 54 - only element with pokemon id
                        console.log(pokemonLi)
                        ul.removeChild(pokemonLi) //remove from DOM
                    })
                })
            })
            
            
            //add Event Listener to 'Add Pokemon' button
            addPokemon.addEventListener('click', () => {
                if (pokemonsOfTrainer.length < 6) {
                    console.log('hello')
                    data = {trainer_id: trainer.id}
                    fetch('http://localhost:3000/pokemons', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept":"application/json"
                        },
                        body: JSON.stringify(data)
                    })
                    .then(resp => resp.json())
                    .then(newPokemon => {
                        const newPokemonLine = document.createElement('li')
                        newPokemonLine.innerText = `${newPokemon.species} (${newPokemon.nickname})`
                        newPokemonLine.id = newPokemon.id
                        ul.appendChild(newPokemonLine)

                        const buton = document.createElement('button')
                        newPokemonLine.appendChild(buton)
                        buton.classList.add("release")
                        buton.innerText = "Release"
                        buton.id = newPokemon.id
                        console.log(newPokemon)
                    

                        //add Event Listener to 'Release' button
                        buton.addEventListener('click', () => {
                            fetch(`http://localhost:3000/pokemons/${newPokemon.id}`, {
                                method: "DELETE"
                            })
                            //response is deleted pokemon 
                            .then(resp => resp.json())
                            .then(deletedPokemon => {
                                const pokemonLi = document.getElementById(`${deletedPokemon.data.attributes.id}`) //from line 96 - only element with pokemon id
                                console.log(pokemonLi)
                                ul.removeChild(pokemonLi) //remove from DOM
                            })
                        })
                    })
                }
            })
        }
    }
})