const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainDiv = document.querySelector('main')

mainDiv.addEventListener('click', e => {
  // debugger
  if (e.target.dataset.trainerId !== undefined) {
    fetch(POKEMONS_URL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        trainer_id: e.target.dataset.trainerId
      })
    })
      .then(res => res.json())
      .then(pokemon => addPokemon(pokemon))
  }
  if (e.target.dataset.pokemonId !== undefined) {
    e.target.parentElement.remove()
    fetch(POKEMONS_URL + '/' + e.target.dataset.pokemonId, {
      method: "DELETE"
    });
  }
});

fetch(TRAINERS_URL)
  .then(res => res.json())
  .then(putTrainersOnPage)

function putTrainersOnPage(trainers) {
  trainers.forEach(trainer => {
    let pokString = ""
    trainer.pokemons.forEach(pokemon => {
      pokString += `<li>${pokemon.nickname} (${pokemon.species}) <button
      class="release" data-pokemon-id="${pokemon.id}">Release</button><li>`
    });
    mainDiv.innerHTML += `
    <div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
      <button data-trainer-id="${trainer.id}">Add Pokemon</button>
      <ul>
        ${pokString}
      </ul>
    </div>
    `
  })
}

function addPokemon(pokemon) {
  // debugger
  mainDiv.querySelector(`div.card[data-id="${pokemon.trainer_id}"]`).lastElementChild.innerHTML +=
  `<li>${pokemon.nickname} (${pokemon.species}) <button class="release"
  data-pokemon-id="${pokemon.id}">Release</button></li>`
}
