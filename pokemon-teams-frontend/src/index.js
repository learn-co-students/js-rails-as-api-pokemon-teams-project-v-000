const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function() {
  getTeams();
});


function getTeams() {
  document.getElementsByTagName('main')[0].innerHTML = ""
  fetchData = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }
  fetch(TRAINERS_URL)
  .then(resp => resp.json())
  .then(json => displayTrainerCards(json))
  .catch(error => console.log(error.message))
}

function displayTrainerCards(data) {
  console.log(data)
  data.forEach((trainer) => {
    const card = document.createElement('div');
    card.classList.add("card");
    card.setAttribute('data-id', trainer.id);
    card.textContent = trainer.name;

    const button = document.createElement('button')
    button.setAttribute('data-trainer-id', trainer.id);
    button.textContent = 'Add Pokemon';
    card.appendChild(button);

    const pokemonList = document.createElement('ul');
    pokemonList.setAttribute('data-trainer-id', trainer.id);
    card.appendChild(pokemonList);

    document.getElementsByTagName('main')[0].appendChild(card);
    displayPokemon(trainer)
  });

  const addPokemonButtons = getAddPokemonButtons();
  addPokemonButtons.forEach((addPokemonButton) => {
    addPokemonButton.addEventListener('click', (e) => {
      attachAddPokemonListener(e);
    });
  });

  const releaseButtons = getReleaseButtons();
  releaseButtons.forEach((releaseButton) => {
    releaseButton.addEventListener('click', (e) => {
      attachReleaseButtonListeners(e);
    });
  });
}

function displayPokemon(trainer) {
  trainer.pokemon.forEach((pokemon_member) => {
    const pokemonLi = document.createElement('li');
    pokemonLi.setAttribute('data-trainer-id', trainer.id);
    pokemonLi.textContent = pokemon_member.nickname;

    const releaseButton = document.createElement('button');
    releaseButton.setAttribute('data-pokemon-id', pokemon_member.id)
    releaseButton.textContent = "Release";

    pokemonLi.appendChild(releaseButton);
    document.querySelector('ul[data-trainer-id="' + trainer.id + '"]').appendChild(pokemonLi);
  });
}

function attachAddPokemonListener(e) {
  const trainerId = e.target.getAttribute('data-trainer-id');
  if (document.querySelectorAll('li[data-trainer-id="' + trainerId + '"]').length < 6) {
    const postBody = { trainer_id: trainerId};
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(postBody)
    }
    fetch(POKEMONS_URL, postData)
    .then(resp => resp.json())
    .then((json) => {
      getTeams();
    })
    .catch(error => console.log(error.message))
  } else {
    alert('Maximum 6 Pokemon per trainer!');
  }
}

function attachReleaseButtonListeners(e) {
  const pokemonId = e.target.getAttribute('data-pokemon-id');
  const deleteData = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }
  fetch(POKEMONS_URL + '/' + pokemonId, deleteData)
  .then(resp => resp.json())
  .then(json => getTeams())
}

function getAddPokemonButtons() {
  const buttons = Array.from(document.querySelectorAll('button'));
  return buttons.filter((x) => x.textContent == "Add Pokemon");
}

function getReleaseButtons() {
  const buttons = Array.from(document.querySelectorAll('button'));
  return buttons.filter( x => x.textContent == 'Release');
}
