document.addEventListener("DOMContentLoaded", () =>{
  displayTrainers()
})

function displayTrainers(){
  fetchJson(TRAINERS_URL)
  .then(trainers => {
    trainers.forEach(trainer => buildCard(trainer))
  })
}

function buildCard(trainer){
  const mainWrapper = document.querySelector("main")
  let card = Object.assign(document.createElement("div"), {className: "card"})
  const name = Object.assign(document.createElement("p"), {textContent: trainer.name})
  let button = Object.assign(document.createElement("button"), {textContent: "Add Pokemon", value: "Add Pokemon"})
  const pokemonList = Object.assign(document.createElement("ul"), {className: "pokemonList"})

  card.dataset.id = trainer.id
  button.dataset.trainerId = trainer.id
  button.addEventListener("click", createPokemon)

  
  card.append(name, button, pokemonList)
  mainWrapper.append(card)

  trainer.pokemons.forEach(pokemon => addPokemon(pokemon))
}

function addPokemon(obj){
  const pokemonList = document.querySelector(`div[data-id="${obj.trainer_id}"] ul`)
  let pokemon = Object.assign(document.createElement("li"), {textContent: `"${obj.nickname}"  |  ${obj.species}`})
  let button = Object.assign(document.createElement("button"), {textContent: "Release", value: "Release", className: "release"})
  button.dataset.pokemonId = obj.id
  button.addEventListener("click", deletePokemon)

  pokemon.append(button)
  pokemonList.append(pokemon)
}

function createPokemon(event){
  event.preventDefault()
  const body = { trainer_id: event.target.dataset.trainerId }

  const configObj = configOptns("POST", body)
  fetchJson(POKEMONS_URL, configObj)
  .then( json => {
    if (json.failure){
      alert(json.failure)
    }else{
      addPokemon(json)
    }
  })
  .catch( error => console.log(error))
}

function deletePokemon(event){
  event.preventDefault()

  const configObj = configOptns("DELETE")
  fetchJson(`${POKEMONS_URL}/${event.target.dataset.pokemonId}`, configObj)
  .then( json => {
    if (json.error) {
     alert(json.error)
    }else{
      this.parentElement.remove()
    }
  })
  .catch(error => console.log(error))
}