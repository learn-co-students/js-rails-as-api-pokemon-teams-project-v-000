const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function renderTeams(json){
  let main = document.querySelector("main");

  Array.from(json).forEach(function(trainer){
    renderTrainer(trainer, main);

  })
}

function renderTrainer(trainer, main){
    let cardDiv = document.createElement("div");
    cardDiv.className = "card";
    cardDiv.dataset.id = trainer.id;
    main.appendChild(cardDiv);

    let trainerName = document.createElement("p");
    trainerName.innerText = trainer.name;
    cardDiv.appendChild(trainerName);

    let button = document.createElement("button");
    button.innerText= "Add pokemon";
    button.dataset.trainerid = trainer.id;
    cardDiv.appendChild(button);

    let pokemonList = document.createElement("ul");
    cardDiv.appendChild(pokemonList);

    trainer.pokemons.forEach(function(pokemon){
      renderPokemon(pokemon, pokemonList)
    });
}

function renderPokemon(pokemon, pokemonList){
    let li = document.createElement("li");
    li.innerText = `${pokemon.nickname} (${pokemon.species})`
    pokemonList.appendChild(li);

    let releaseButton = document.createElement("button");
    releaseButton.innerText = "release";
    releaseButton.className = "release";
    releaseButton.dataset.pokemonid = pokemon.id;
    li.appendChild(releaseButton);
}

function addPokemon (event){
  let ul = event.target.closest("div").childNodes[2];
  let trainerId = event.target.dataset.trainerid;
  let configObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }

  if(ul.childNodes.length < 6){
    fetch(`${TRAINERS_URL}/${trainerId}/pokemons`, configObject)
    .then(response => response.json())
    .then(newPokemon => renderPokemon(newPokemon, ul))
    .catch(error => console.log(error.message))
  } else{
    alert("Team full: You must release a Pokemon before you can add a new one.")
  }
}

function releasePokemon(event){
  let pokemonId = event.target.dataset.pokemonid
  let configObject = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }
  fetch(`${POKEMONS_URL}/${pokemonId}`, configObject)
  .then(response => response.json())
  .then(function(json){
    event.target.closest("li").remove()
  })
  .catch(error => console.log(error.message))
}

document.addEventListener("DOMContentLoaded", function (){
  fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(json => renderTeams(json))

    let main = document.querySelector("main");
    main.addEventListener("click", function(event){
      if (event.target.dataset.trainerid){
        addPokemon(event);
      } else if (event.target.dataset.pokemonid) {
        releasePokemon(event);
      }
    })
})
