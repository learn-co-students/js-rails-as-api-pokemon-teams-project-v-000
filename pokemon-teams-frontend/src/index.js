const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function addPokemon(event) {
    // <button data-trainer-id="2">Add Pokemon</button>

    const trainerPokemonList = event.target.parentElement.querySelector('ul');
    const trainerId = event.target.getAttribute('data-trainer-id');
    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            trainer_id: trainerId
        })
    }

    fetch(POKEMONS_URL, configObj)
        .then(response => {
            return response.json();
        })
        .then(object => {
            if ('message' in object) {
                alert(object.message);
            } else {
                // {id: 43, species: "Magneton", nickname: "Terence", trainer_id: 2, created_at: "2021-05-15T18:43:27.805Z", …}
                trainerPokemonList.appendChild(pokemonInstance(object));
            }
        })
        .catch(error => {
            alert(`An error has occurred\r\n${error.message}`);
        })
};

function releasePokemon(event) {
    // <button class="release" data-pokemon-id="5">Release</button>
    const trainerPokemonList = event.target.parentElement.parentElement;
    const pokemonReleased = event.target.parentElement;
    const pokemonId = event.target.getAttribute('data-pokemon-id');

    const configObj = {
        method: "DELETE",
        header: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }

    fetch(`${POKEMONS_URL}/${pokemonId}`, configObj)
        .then(response => {
            trainerPokemonList.removeChild(pokemonReleased);
        })
        .catch(error => {
            alert(`An error has occurred\r\n${error.message}`);
        })
};

function pokemonInstance(pokemon) {
    // {id: 38, species: "Golduck", nickname: "Genaro", trainer_id: 9}
    const li = document.createElement('li');
    const btnRelease = document.createElement('button');

    li.innerText = `${pokemon.nickname} (${pokemon.species})`;

    btnRelease.classList.add("release");
    btnRelease.setAttribute('data-pokemon-id',pokemon.id);
    btnRelease.innerText = "Release";
    btnRelease.addEventListener('click',function(event){
        releasePokemon(event);
    })

    li.appendChild(btnRelease);
    return li;
}

function buildCard(trainer) {
    const div = document.createElement('div');
    const p = document.createElement('p');
    const btnAdd = document.createElement('button');
    const ul = document.createElement('ul');

    for (const pokemon of trainer.pokemons) {
        ul.appendChild(pokemonInstance(pokemon));
    }

    btnAdd.setAttribute('data-trainer-id', trainer.id);
    btnAdd.innerText = "Add Pokemon";
    btnAdd.addEventListener('click',function(event){
        addPokemon(event);
    });

    p.innerText = trainer.name;

    div.classList.add("card");
    div.setAttribute('data-id', trainer.id);
    div.appendChild(p);
    div.appendChild(btnAdd);
    div.appendChild(ul);
    
    document.querySelector('main').appendChild(div);
};

function loadTrainersPokemons() {
    fetch(TRAINERS_URL)
        .then(response => {
            return response.json();
        })
        .then(trainers => {
            for (const trainer of trainers) {
                buildCard(trainer);
            }
        });
};

// just realized - this should be the last function in the file, so everything else can load first - light bulb!
document.addEventListener("DOMContentLoaded", function() {
    loadTrainersPokemons();
});