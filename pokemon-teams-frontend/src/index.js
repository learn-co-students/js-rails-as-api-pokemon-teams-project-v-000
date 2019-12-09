const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector('main');

function renderPokemon(data, li) {
  li.innerHTML = `${data.species} (${data.nickname}) <button class="release" data-pokemon-id="${data.id}">Release</button>`;
}

function addPokemon(event) {
  let pokemon_list = event.currentTarget.nextElementSibling
  if (pokemon_list.childElementCount < 6) {
    let data = {
      "trainer_id": event.currentTarget.getAttribute("data-trainer-id")
    }

    let new_li = document.createElement('li');

    fetch(POKEMONS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(resp => resp.json())
    .then(json => renderPokemon(json["data"].attributes, new_li))

    pokemon_list.appendChild(new_li);
  } else {
    alert('Sorry, trainers are only allowed 6 pokemon.')
  }
}

function fetchTrainers() {
  fetch(TRAINERS_URL)
    .then(resp => {
      return resp.json()
    })
    .then(json => {
      renderTrainers(json["data"])
    });
};

function renderTrainers(data) {
  data.forEach(trainer => {
    //create pokemons variable
    const pokemons = trainer["relationships"]["pokemons"]["data"]
    // create div container
    const div = document.createElement('div');
    div.setAttribute('class', 'card');
    div.setAttribute('data-id', `${trainer.id}`);
    div.innerHTML = `<p>${trainer["attributes"]["name"]}</p>`;

    // create add pokemon button
    const button = document.createElement('button');
    button.setAttribute('data-trainer-id', `${trainer.id}`);
    button.innerHTML = 'Add Pokemon';
    button.addEventListener('click', addPokemon);

    div.appendChild(button);
    // generate pokemon list container
    const ul = document.createElement('ul');

    pokemons.forEach(function(pokemon) {
      const li = document.createElement('li');

      fetch(`${POKEMONS_URL}/${pokemon.id}`)
        .then(resp => {
          return resp.json()
        })
        .then(json => {
          renderPokemon(json["data"].attributes, li);
        })
      ul.appendChild(li);
   });
   div.appendChild(ul);
   main.appendChild(div);

  })
}

document.addEventListener("DOMContentLoaded", () => {
  fetchTrainers();

  main.addEventListener('click', function(event) {
    if(event.target.nodeName === "BUTTON") {
      // make previous if statement with && if you can generate add pokemon buttons with event listeners
      if(event.target.className === "release") {
        if(confirm('Are you sure you want to release?')) {
          event.target.parentNode.remove();
        }
      }
    }
  });
});
