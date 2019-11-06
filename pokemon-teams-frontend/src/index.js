const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


document.addEventListener("DOMContentLoaded", () => {
    fetchTrainers();


    // look into the best way to make sure the new pokemons added also have the event listener
})

function fetchTrainers() {
    fetch(TRAINERS_URL)
        .then(resp => resp.json())
        .then(json => json.forEach(trainer => {
            renderTrainer(trainer)
        }));
}

function renderTrainer(trainer) {
    const mainCont = document.querySelector('main')

    const div = document.createElement('div')
    div.className= "card"
    div.setAttribute('data-id', `${trainer.id}`)
    mainCont.appendChild(div)

    const pTrainerName = document.createElement('p')
    pTrainerName.innerText = `${trainer.name}`
    div.appendChild(pTrainerName)

    const addBtn = document.createElement('button')
    addBtn.setAttribute('data-trainer-id', `${trainer.id}`)
    addBtn.innerText = `Add Pokemon`
    div.appendChild(addBtn)

    const ul = document.createElement('ul')
    div.appendChild(ul)

    trainer.pokemons.forEach(pokemon => {
        li = document.createElement('li')
        li.innerText = `${pokemon.species} (${pokemon.nickname})`
        const releaseBtn = document.createElement('button')
        releaseBtn.className = 'release'
        releaseBtn.setAttribute('data-pokemon-id', `${pokemon.id}`)
        releaseBtn.innerText = `Release`
        li.appendChild(releaseBtn)
        ul.appendChild(li)
        
        releaseBtn.addEventListener("click", (e) => {
            console.log(e.target.parentNode)
            let delObj = {
                method: "DELETE"
            }

            fetch(`${POKEMONS_URL}/${e.target.dataset.pokemonId}`, delObj)
                .then(function (response) {
                    return response.json();
                })
                .then(function (json) {
                    console.log(json)
                    e.target.parentNode.remove()
                })
        })
    })

    addBtn.addEventListener("click", () => {
        addPokemon()
    })

    function addPokemon() {
        const trainerId = addBtn.getAttribute('data-trainer-id')

        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "trainer_id": `${trainerId}`
            })
        };

        fetch(POKEMONS_URL, configObj)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                if (json.error) {
                    alert(json.error)
                } else {
                    const newPokemon = document.createElement('li')
                    newPokemon.innerText = `${json.species} (${json.nickname})`
                    releaseBtn = document.createElement('button')
                    releaseBtn.className = 'release'
                    releaseBtn.setAttribute('data-pokemon-id', `${json.id}`)
                    releaseBtn.innerText = `Release`
                    newPokemon.appendChild(releaseBtn)

                    releaseBtn.addEventListener("click", (e) => {
                        let delObj = {
                            method: "DELETE"
                        }

                        fetch(`${POKEMONS_URL}/${e.target.dataset.pokemonId}`, delObj)
                            .then(function (response) {
                                return response.json();
                            })
                            .then(function (json) {
                                console.log(json)
                                e.target.parentNode.remove()
                            })
                    })

                    ul.appendChild(newPokemon);
                }
            });
    }

}


