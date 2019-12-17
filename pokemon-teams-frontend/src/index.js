const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const trainerCollection = document.querySelector('#trainer-collection');

document.addEventListener('DOMContentLoaded', () => {
  getTrainers().then(trainers => {
    trainers.forEach(trainer => {
      renderTrainer(trainer);
    })
  })
});

function getTrainers() {
  return fetch(TRAINERS_URL)
  .then(res => res.json());
}

function renderTrainer(trainer) {
  const p = document.createElement('p');
  p.innerText = trainer.name;

  const addBtn = document.createElement('button');
  addBtn.className = 'add';
  addBtn.setAttribute('data-trainer-id', trainer.id);
  addBtn.innerText = "Add Pokemon";
  addBtn.addEventListener('click', e => {
    if (trainer.pokemons.length < 6) {
      fetch(POKEMONS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          trainer_id: e.target.dataset.trainerId
        })
      })
      .then(resp => resp.json())
      .then(pokemon => {
        trainer.pokemons.push(pokemon);
        const li = renderPokemon(pokemon);
        const releaseBtn = renderReleaseBtn(pokemon);

        li.appendChild(releaseBtn);
        ul.appendChild(li);
      })
    } else {
      alert(`${trainer.name}'s party is full!`)
    }
  })

  const ul = document.createElement('ul');
  trainer.pokemons.forEach(pokemon => {
    const li = renderPokemon(pokemon)
    const releaseBtn = renderReleaseBtn(pokemon)

    li.appendChild(releaseBtn);
    ul.appendChild(li);
  });

  const divCard = document.createElement('div');
  divCard.className = 'card';
  divCard.setAttribute('data-id', trainer.id);
  divCard.append(p, addBtn, ul);
  trainerCollection.append(divCard);
}

function renderPokemon(pokemon) {
  const li = document.createElement('li');
  li.innerText = `${pokemon.nickname} (${pokemon.species})`;
  return li;
}

function renderReleaseBtn(pokemon) {
  const releaseBtn = document.createElement('button');
  releaseBtn.className = 'release';
  releaseBtn.setAttribute('data-pokemon-id', pokemon.id);
  releaseBtn.innerText = "Release";
  releaseBtn.addEventListener('click', e => {
    fetch(POKEMONS_URL + `/${pokemon.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        trainer_id: e.target.dataset.trainerId
      })
    })
    .then(resp => resp.json())
    .then(pokemon => {
      document.querySelector(`[data-pokemon-id="${pokemon.id}"]`).parentNode.remove()
    })
  })
  return releaseBtn;
}
