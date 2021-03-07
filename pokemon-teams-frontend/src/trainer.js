document.querySelector(`script[src*="trainer.js"]`).addEventListener("load", (event)=>{
  console.log("Script trainer.js is loaded!")
  // Script Loaded //

  fetchTrainers().then((trainers)=>{displayTrainers(trainers)})

})// End of Script Loaded


// Fetching Functions //

function fetchTrainers() {
  return fetchFromServer(TRAINERS_URL).then(data=>data)
}

function fetchTrainer(id) {
  return fetchFromServer(TRAINERS_URL + "/" + String(id)).then(data=>data)
}


// DOM Updating Functions //

function updateTrainerCard(trainer) {
  const card = document.querySelector(`.card[data-id="${trainer.id}"]`)

  if (card === null) {
    console.error("Could not find card for trainer: " + trainer)
  } else {
    createPokemonsList(trainer.pokemons, card)
  }
}

function displayTrainers(trainers) {
  for (const trainer of trainers) {
    createTrainerCard(trainer)
  }
}

function createTrainerCard(trainer) {
  const div = document.createElement('div')
  div.classList.add("card"); div.dataset.id = String(trainer.id);
  document.querySelector('main').appendChild(div)

  const p = document.createElement('p')
  p.innerText = trainer.name
  div.appendChild(p)

  const button = document.createElement('button')
  button.innerHTML = "Add Pokemon"
  div.appendChild(button)

  button.addEventListener("click", (event)=>{
    createPokemonForTrainer(trainer).then(resp=>{
      fetchTrainer(trainer.id).then(trainer => updateTrainerCard(trainer))
    })
  })

  createPokemonsList(trainer.pokemons, div)
}

function createPokemonsList(pokemons, parent) {
  let element = parent.querySelector('ul')
  if (element !== null) {
    element.remove()
  }
  const ul = document.createElement('ul')
  parent.appendChild(ul)

  for (const pokemon of pokemons) {
    const li = document.createElement('li')
    li.innerHTML = `${pokemon.nickname} (${pokemon.species})"`
    ul.appendChild(li)

    const button = document.createElement('button')
    button.classList.add("release"); button.dataset.pokemon_id = pokemon.id; button.textContent = "Release"
    li.appendChild(button)

    li.addEventListener("click", (event)=>{
      removePokemon(pokemon).then(resp=>{
        fetchTrainer(pokemon.trainer_id).then(trainer => updateTrainerCard(trainer))
      })
    })
  }
}