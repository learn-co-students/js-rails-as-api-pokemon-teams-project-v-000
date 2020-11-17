const BASE_URL = "http://localhost:3000"
const TRAINER_URL = `${BASE_URL}/trainer`
const POKEMON_URL = `${BASE_URL}/pokemon`

document.addEventListener('DOMContentLoaded', function() {
    loadTeams();

    function loadTeams() {

        const teamData = TRAINER_URL

        fetch(teamData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(res => res.json())
            .then(results => {
                results.data.forEach(trainer => addCard(trainer))
                results.included.forEach(pokemon => listPokemon(pokemon))
                console.log(results)
            });
    }

    function addCard(trainer) {
        let card = document.createElement('div');
        let body = document.querySelector('body');
        let pokemonList = document.createElement('ul');
        let addButton = document.createElement('button');

        pokemonList.id = 'pokemon-list-' + trainer.id;
        addButton.id = 'add-button';
        addButton.innerText = 'Add Pokemon'
        card.className = "card";

        trainerName = document.createElement('h1');
        trainerName.innerHTML = trainer.attributes.name;

        body.appendChild(card)
        card.appendChild(trainerName)
        card.appendChild(addButton)
        card.appendChild(pokemonList)

        addButton.addEventListener("click", addPokemon);
    }

    function listPokemon(pokemon) {
        let pokemonList = document.querySelector(`#pokemon-list-${pokemon.relationships.trainer.data.id}`);
        let listItem = document.createElement('li');
        let releaseButton = document.createElement('button');
        releaseButton.className = 'release';
        releaseButton.innerText = 'Release';

        listItem.innerHTML = pokemon.attributes.nickname + ' (' + pokemon.attributes.species + ')'
        listItem.setAttribute("id", pokemon.id)

        listItem.appendChild(releaseButton)

        pokemonList.appendChild(listItem)

        releaseButton.addEventListener("click", releasePokemon);

    }

    function addPokemon() {
        event.preventDefault();

        let pokemonList = event.target.parentElement.childNodes[2].childNodes
        let trainerId = event.target.parentElement.lastChild.id.slice(-1)
            // pokemonList.add(document.createElement('li'));

        console.log(trainerId)

        if (pokemonList.length < 6) {

            fetch('http://localhost:3000/pokemon', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        // "nickname": 'test name',
                        // "species": 'test species',
                        // "trainer_id": trainerId
                    })
                })
                .then((response) => response.json())
                .then((pokeObj) => {
                    console.log(pokeObj)
                        // listItem.innerHTML = pokeObj.nickname + ' (' + pokeObj.species + ')'
                })
                // .catch((error) => {
                //     console.error('Error:', error);
                // });
        } else {
            window.alert("Your team cannot hold more than 6 pokemon. Please release a pokemon before trying to add a new pokemon.")
        }

    }

    function releasePokemon() {

        console.log(event)

        let pokemon = event.target.parentElement

        console.log(pokemon.id)

        fetch(`http://localhost:3000/pokemon/${pokemon.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pokemon)
            })
            .then((res) => res.json())
            .then((obj) => {
                return pokemon.remove();
            })

    }

});