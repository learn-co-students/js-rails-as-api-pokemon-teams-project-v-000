const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector("main");

document.addEventListener("DOMContentLoaded", fetchTrainersData())

main.addEventListener("click", function(event) {
  if (event.target.innerText === "Add Pokemon") {
    const trainerId = event.target.dataset.trainerId;
    addPokemon(trainerId);
  }  else if (event.target.innerText === "Release") {
    const pokemonId = event.target.dataset.pokemonId
    const trainerId = event.target.parentNode.parentNode.parentNode.dataset.id
    releaseEvent(pokemonId);
  }
});

function addPokemon(trainerId){
    var requestOptions = {
        method: 'POST',
        // redirect: 'follow'
      };
      
      fetch(`http://localhost:3000/pokemons/?trainer_id=${trainerId}`, requestOptions)

  
};

function releaseEvent(pokemonId){
    

      
      fetch(`${POKEMONS_URL}/${pokemonId}`, {method: 'DELETE'})
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
};

function fetchTrainersData() {
    fetch(TRAINERS_URL)
      .then(resp => resp.json())
      .then(trainers => {
        console.log("test")
        addTrainersToDom(trainers)
    })
    .catch(error => console.log(error))
};

function addTrainersToDom(trainers) {
    console.log("test")
    trainers.forEach(trainer => {

      const divElement = document.createElement("div");
      divElement.setAttribute("class", "card");
      divElement.setAttribute("data-id", trainer.id);
      main.appendChild(divElement)

      const p = document.createElement("p");
      p.innerHTML = trainer.name;
      divElement.appendChild(p);

      const btn = document.createElement("button");
      btn.setAttribute("data-trainer-id", trainer.id);
      btn.innerHTML = "Add Pokemon";
      divElement.appendChild(btn);

      const ul = document.createElement("ul");
      divElement.appendChild(ul);

      let pokemons = trainer.pokemons
      pokemons.forEach(pokemon => {
          const li = document.createElement("li");
          li.innerHTML = `${pokemon.nickname} (${pokemon.species})`;
          ul.appendChild(li);
          const releaseBtn = document.createElement("button");
          releaseBtn.setAttribute("class", "release");
          releaseBtn.setAttribute("data-pokemon-id", pokemon.id);
          releaseBtn.innerHTML = "Release";
          li.appendChild(releaseBtn);
        });
    })
};



function handleReleaseEvent(){
  
};





