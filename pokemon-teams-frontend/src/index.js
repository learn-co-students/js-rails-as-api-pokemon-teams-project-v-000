const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemon`

const mainBody = document.querySelector("main")

function renderTrainerCards() {
  mainBody.innerHTML = ""
  return fetch(TRAINERS_URL)
    .then(res=>res.json())
    .then(json=>json.forEach(trainer=>renderTrainerCard(trainer)))
};

function renderTrainerCard(trainer){
  let trainerCard = document.createElement("div")
  trainerCard.id = `card${trainer.id}`
  trainerCard.classList.add("card")
  trainerCard.setAttribute("data-id", trainer.id);

  let trainerName = document.createElement("p")
  trainerName.innerText = trainer.name

  let addPokemonButton = document.createElement("button")
  addPokemonButton.setAttribute("data-trainer-id",trainer.id)
  addPokemonButton.innerText = "Add Pokemon!"
  addPokemonButton.addEventListener("click", addEvent => addPokemon(addEvent.target))
  
  let pokemonList = renderPokemonList(trainer.pokemon)
  
  trainerCard.append(trainerName)
  trainerCard.append(addPokemonButton)
  trainerCard.append(pokemonList)
  mainBody.append(trainerCard)
}

function renderPokemonList(pokemonArray) {
  const pokemonList = document.createElement("ul")
  pokemonArray.forEach(pokemon => {
    let pokemonLI = createPokemonItem(pokemon)
    pokemonList.append(pokemonLI)
  })
  return pokemonList
}

function createPokemonItem(pokemon) {
  let pokemonItem = document.createElement("li")
  pokemonItem.id=`pokemonItem${pokemon.id}`
  pokemonItem.innerText = `${pokemon.nickname} (${pokemon.species})`
  
  let removePokemonButton = document.createElement("button")
  removePokemonButton.classList.add("release")
  removePokemonButton.setAttribute("data-pokemon-id",pokemon.id)
  removePokemonButton.innerText = "Release"
  removePokemonButton.addEventListener("click", removeEvent => releasePokemon(removeEvent.target))

  pokemonItem.append(removePokemonButton)
  
  return pokemonItem
}

function addPokemon(eventTarget) {
  let formData = {
    "trainer_id": eventTarget.getAttribute("data-trainer-id")
  }

  let configInfo = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  }

  return fetch(POKEMONS_URL, configInfo)
    .then(resp => resp.json())
    .then(json => {
      if (json.error){
        console.log(json)
      } else {
        addNewPokemon(json)
      }
    })
    .catch(error => console.log(error.message));
}

function addNewPokemon(pokemon) {
  let trainerCard = document.getElementById(`card${pokemon.trainer_id}`)
  let pokemonList = trainerCard.querySelector('ul')
  let pokemonItem = createPokemonItem(pokemon)
  pokemonList.append(pokemonItem)
}

function releasePokemon(event) {
  let pokemonUrl = `${POKEMONS_URL}/${event.getAttribute("data-pokemon-id")}`

  let configInfo = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: ""
  }
  
  return fetch(pokemonUrl, configInfo)
    .then(resp => resp.json())
    .then(json => {
      if (json.error) {
        console.log(json)
      } else {
        removeReleasedPokemon(json)
      }
    })
    .catch(error => console.log(error.message));
}

function removeReleasedPokemon(pokemon) {
  let pokemonItem = document.getElementById(`pokemonItem${pokemon.id}`)
  pokemonItem.remove()
}

document.addEventListener('DOMContentLoaded', ()=>{
  renderTrainerCards();
})