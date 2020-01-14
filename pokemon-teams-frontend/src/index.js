const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


document.addEventListener("DOMContentLoaded", function(){
  fetchTrainers();
})

function fetchTrainers(){
  fetch(TRAINERS_URL)
  .then(resp => resp.json())

  .then(trainersObj =>
    renderTrainers(trainersObj));
}


function renderTrainers(trainersObj){
const main = document.querySelector('main')
  main.innerHTML = ""
  trainersObj.forEach(function(elem){
    let cardDiv = document.createElement('div')
    cardDiv.classList.add('card')
    cardDiv.setAttribute('data-id', elem.id)
    let addbutton = document.createElement('button')
    addbutton.setAttribute('data-trainer-id', elem.id)
    addbutton.innerText = "ADD POKEMON"
    addbutton.addEventListener('click', event => {
      addPokemon(event);
    });
    let p = document.createElement('p')
    p.innerHTML = elem.name
    const ul = document.createElement('ul')
    elem.pokemons.forEach(function(pokemon){
    let li = document.createElement('li')
    li.innerText = pokemon.species + '('+ pokemon.nickname + ')'
    let releasebtn = document.createElement('button')
    releasebtn.innerText = "RELEASE"
    releasebtn.classList.add("release")
    releasebtn.setAttribute('data-pokemon-id', pokemon.id)
    releasebtn.addEventListener('click', event => {
      releasePokemon(event)
    });
    li.append(releasebtn)
    ul.append(li)
  })
    cardDiv.append(addbutton,p,ul)
    main.appendChild(cardDiv)
  });
}

function releasePokemon(event) {
   return fetch(`${POKEMONS_URL}/${event.target.dataset.pokemonId}`, {
     method: "DELETE",
  })
  .then(response => console.log(response))
  .then(fetchTrainers);
}

function addPokemon(event) {

if (event.target.nextSibling.nextSibling.childElementCount < 6) {
  createPokemon(event)
} else {
  alert("You cannot add more than 6 to a team")}
}

function createPokemon(event){

  return fetch(TRAINERS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      trainer_id: event.srcElement.dataset.trainerId
      })
  })
  .then(response => response.json())
  .then(fetchTrainers);
}
