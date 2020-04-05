const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

let addPokemon = document.getElementById("add-pokemon");
let release = document.getElementsByClassName("release");
let divCard = document.createElement("div");
let main = document.querySelector("main");
divCard.setAttribute('class','card');
let ul = document.querySelector("ul");
ul.setAttribute('id', 'pokemon-list')

document.addEventListener('DOMContentLoaded', function(e){
  displayHome();
  // addPokemonBtn();
  // releaseBtn();
});

// function addPokemonBtn(){
//   let addBtn = document.getElementById("add-pokemon");
//   let cardDiv = document.getElementsByClassName("card");
//   let ul = document.getElementsByTagName("ul");
//
//       // console.log(cardDiv);
//     divCard.forEach(function(e){
//       console.log(e);
//     })
//   }
//
// function releaseBtn(){}

function displayHome(){
  fetch("http://localhost:3000/trainers")
  .then(function(response){
    return response.json();
  }).then(function(json){
    json.data.forEach(function(trainer){
      let newTrainer = trainer;
      let newDiv = document.createElement("div");
      newDiv.setAttribute('class', 'card');
      let newAddBtn = document.createElement("button");
      let main = document.querySelector("main");
      newAddBtn.setAttribute('id', 'add-pokemon');
      newAddBtn.innerText="Add Pokemon";

      let trainerName = trainer.attributes.name;
      let createName = document.createElement("p");

      createName.innerText=trainerName;
      let ul = document.createElement("ul");
      ul.setAttribute('id', 'pokemon-list')
      let tPokemons = trainer.attributes.pokemons;
      // console.log()

        tPokemons.forEach(function(p){
          let li = document.createElement("li");
          let newReleaseBtn = document.createElement("button");
          newReleaseBtn.setAttribute('class', 'release');
          newReleaseBtn.innerText="Release";
          let pokemonName = p.nickname;
          let pokemonSpecies = p.species;
          li.innerHTML=`${pokemonName} (${pokemonSpecies})`;
          ul.appendChild(li)
          li.appendChild(newReleaseBtn)
        });

      main.appendChild(newDiv);
      newDiv.appendChild(createName);
      newDiv.append(newAddBtn);
      newDiv.append(ul);
})})}

main.addEventListener('click', (e) => {
  if (e.target.dataset.action === "add"){
    const trainerId = e.target.dataset.trainerId;
    const trainerUl = e.target.parentNode.querySelector('ul');
    if (trainerUl.children.length < 6){
      fetch(POKEMONS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "trainer_id": trainerId
        })
      })
      .then(resp => resp.json())
      .then(newPokemon => {
        const pokeHTML = `
        <li>${newPokemon.nickname} (${newPokemon.species})
          <button class="release" data-pokemon-id=${newPokemon.id}>
            Release
          </button>
        </li>`;

        trainerUl.insertAdjacentHTML('beforeend', pokeHTML);
      })
    }
  };
  if (e.target.classList.contains("release")){
    const pokemonId = e.target.dataset.pokemonId;
    fetch(`${POKEMONS_URL}/${pokemonId}`, {
      method: 'DELETE'
    })
    .then(resp => resp.json())
    .then(() => e.target.parentNode.remove());
  }

})
