const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`



function cardCreation(obj){
  const pokemons = obj.pokemons
  
  // sets up the trainer info and action button
  const text = obj.name
  const main = document.querySelector("main");
  const div = document.createElement("div");
  const p = document.createElement("p");
  const add_button = document.createElement("button")
  div.setAttribute("class", "card");
  div.setAttribute("data-id", obj.id);
  p.innerText = text;
  add_button.setAttribute("data-trainer-id", obj.id);
  add_button.setAttribute("class", "add-pokemon");
  add_button.innerText = "Add Pokemon"
  const ul = document.createElement("ul");
    pokemonlist(pokemons)
  
    // sets up the pokemons info and action button
    function pokemonlist(pokemons) {
        pokemons.forEach(poke => {
        const release_button = document.createElement("button");
        const li = document.createElement("li") 
        release_button.setAttribute("class","release")
        release_button.setAttribute("data-pokemon-id", poke.id)
        release_button.innerText = "Release"
        li.innerText = (`${poke.nickname}  (${poke.species})`)
        li.append(release_button);
        ul.appendChild(li);
        });
      }
  // putting everything together
  div.appendChild(p);
  div.appendChild(add_button);
  div.appendChild(ul);
  main.appendChild(div);
}


function header(type = "POST", formData){
  let configObj = {
    method: type,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  return configObj
}
  


function addPokemon(e){
  const trainerId = e.target.dataset.trainerId
  const formData = { trainer_id: trainerId }
  const configHeader = header("POST", {formData})
  fetch(POKEMONS_URL, configHeader)
  /*
  from here we are going to :
  1. construct a  HEADER by:
  a) creating a body
  b) creating a header
  c) putting the body and header together
  d) sending a post request to POKEMON server
  e) receiving a response with the new POKEMON
  d) updating our HTML 
  */
}

function addEventListeners() {
  let addPokemonList = document.querySelectorAll('[data-trainer-id]');
  for (let i = 0; i < addPokemonList.length; i++) {
    addPokemonList[i].addEventListener('click', (e) => { addPokemon(e) })
  }
  
}

function fetchTrainers(TRAINERS_URL){
  fetch(TRAINERS_URL)
  .then(response=> {return response.json()})
  .then(objs => {objs.forEach(obj => { cardCreation(obj)});})
  .catch((error)=>{console.log(error)})
}

window.onload = (fetchTrainers(TRAINERS_URL), setTimeout(() => {addEventListeners()}, 2000)  )


