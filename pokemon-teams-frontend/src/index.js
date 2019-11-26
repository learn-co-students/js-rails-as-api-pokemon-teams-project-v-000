const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', (event) => {
    getTrainerData();
})

function loadCards(object) {
    const dataArray = Object.values(object)[0];
    const includedArray = Object.values(object)[1];

    for (const trainer of dataArray) {
        const id = trainer.id
        const div = document.createElement('div')
        const main = document.querySelector('main')
        div.className = 'card'
        main.appendChild(div)
        div.setAttribute('data-id', id)

        const p = document.createElement('p')
        p.textContent = trainer.attributes.name 
        div.appendChild(p);
        addPokemonButton(div, id);

        const ul = document.createElement('ul')
        div.appendChild(ul);

        for (const pokemon of includedArray) {
            const trainerId = pokemon.attributes.trainer_id.toString();
            if (trainerId === id) {
                const li = document.createElement('li');
                ul.appendChild(li);
                li.textContent = `${pokemon.attributes.nickname} (${pokemon.attributes.species})`
                const pokemonBtn = document.createElement('button');
                li.appendChild(pokemonBtn);
                pokemonBtn.textContent = 'Release'
                pokemonBtn.classList.add('release');
                const pokemonId = pokemon.id

                pokemonBtn.addEventListener('click', function(event) {
                    fetch(`http://localhost:3000/pokemons/${pokemonId}`, {
                        method: 'DELETE'
                    })
                    .then(response => response.json())
                    .then(() => event.target.parentElement.remove())
                    .catch(error => console.log(error));

                })

            }
        }
    }
}

function addPokemonButton(div, id) {
    const button = document.createElement('button');
    button.setAttribute('data-trainer-id', div.dataset.id);
    button.textContent = "Add Pokemon"
    div.appendChild(button);
    button.addEventListener('click', function(event) {
        configObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({"trainer_id": id})
        }
        fetch(POKEMONS_URL, configObj)
        .then(response => response.json())
        .then(object => {
            const size = Object.keys(object).length;
            if (size > 1) {
                let newId = object.included[0].id
                let ul = document.querySelector(`[data-id='${newId}'] ul`)
                const li = document.createElement('li');
                ul.appendChild(li);
                const species = object.data.attributes.species
                const nickname = object.data.attributes.nickname
                li.textContent = `${nickname} (${species})`
                const pokemonBtn = document.createElement('button');
                li.appendChild(pokemonBtn);
                pokemonBtn.textContent = 'Release'
                pokemonBtn.classList.add('release');
                const pokemonId = object.data.id

                pokemonBtn.addEventListener('click', function(event) {
                    fetch(`http://localhost:3000/pokemons/${pokemonId}`, {
                        method: 'DELETE'
                    })
                    .then(response => response.json())
                    .then(() => event.target.parentElement.remove())
                    .catch(error => console.log(error));
                })
            } else {
                alert(object.message);
            }
        })
        .catch(error => console.log(error))
    })
}

function getTrainerData() {
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(object => loadCards(object))
    .catch(error => console.log(error))
}