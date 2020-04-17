const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

window.onload = function () {
  fetchTrainerData();
}
function fetchTrainerData() {
  fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(function (objectData) {
      cardBuilder(objectData);
      addEventListeners();
    })
    .catch(error => console.log(error))
}

function cardBuilder(objectData) {
  for (let trainer of objectData) {
    let parentDiv = document.createElement('div')
    let pTag = document.createElement('p')
    pTag.innerText = trainer['name'];
    let pokemons = trainer['pokemons']
    let pokemonList = buildPokemonList(pokemons, trainer)
    let button = addPokemonButton(trainer);
    parentDiv.appendChild(pTag)

    parentDiv.appendChild(button);
    parentDiv.appendChild(pokemonList);
    parentDiv.classList.add('card');
    appendToMain(parentDiv);
  }
}

function buildPokemonList(pokemons, trainer) {
  let ul = document.createElement('ul');
  let pokemonCount = 0;
  for (let pokemon of pokemons) {
    let name = pokemon['nickname'];
    let species = pokemon['species'];
    let id = pokemon['id']
    ul.innerHTML += `<li>${name} (${species}) <button class='release' data-trainer-id='${trainer.id}' data-pokemon-id='${id}'>Release</button></li>`
    pokemonCount++

  }
  return ul
}

function appendToMain(card) {
  document.getElementsByTagName('main')[0].appendChild(card)
}

function addPokemonButton(trainer, button) {
  let trainerId = trainer['id']
  let addButton = button || document.createElement('button');
  addButton.innerText = "Add Pokemon"
  addButton.classList.add('add-button')
  addButton.setAttribute('data-trainer-id', trainerId);
  let dojoCount = (trainer.pokemons.length)
  checkDojoCount(dojoCount, addButton);
  return addButton
}

function addEventListeners() {
  let addButtons = document.getElementsByClassName('add-button')
  for (let addButton of addButtons) {
    addButton.addEventListener('click', function (e) {
      let trainerId = e.target.dataset['trainerId']
      fetch(`http://localhost:3000/pokemons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          trainer_id: trainerId
        })
      })
        .then(response => response.json())
        .then((obj) => console.log(obj))
        .catch(error => console.log(error.message))


    })
  }

  let releaseButtons = document.querySelectorAll('button.release');
  for (let button of releaseButtons) {
    button.addEventListener('click', function (e) {
      let li = e.target.parentNode;
      let pokemon = this.dataset['pokemonId']
      let configObject = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          id: pokemon
        })
      };

      fetch(`http://localhost:3000/pokemons/${pokemon}`, configObject)
        .then(response => response.json())
        .then(() => removePokemonNode(li))
        .catch(error => console.log(error.message))

    })
  }
}

function checkDojoCount(numOfPokemon, button) {
  if (numOfPokemon < 6) {
    button.classList.remove('hidden') || button.classList.add('active')
  } else {
    button.classList.add('hidden')
  }
}

function removePokemonNode(li) {
  let remainingPokemon = li.parentNode.children.length - 1;
  li.remove()
  checkDojoCount(remainingPokemon, li)
}

function addNewPokemon(trainer) {

}
