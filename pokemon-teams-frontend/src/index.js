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
  let data = {
    method: type,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  return data
}
  

function append(poke) {
  const trainer_card = document.querySelector(`div.card:nth-child(${poke.trainer_id})`);
  let ul = trainer_card.lastChild; 
  let li = document.createElement("li") 
  li.innerText = (`${poke.nickname}  (${poke.species})`)
  let release_button = document.createElement("button");
  release_button.setAttribute("class", "release")
  release_button.setAttribute("data-pokemon-id", poke.id)
  release_button.innerText = "Release"
  li.append(release_button);
  ul.appendChild(li);
}

function addPokemon(e){
  const trainerId = e.target.dataset.trainerId
  const data = { trainer_id: trainerId }
  const configHeader = header("POST", {data})
  fetch(POKEMONS_URL, configHeader)
  .then((response=>{ return response.json()}))
  .then((data)=>{debugger})
  .then((data)=>{append(data)})
  
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


