const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const trainerCollection = document.querySelector('#trainer-collection');

document.addEventListener('DOMContentLoaded', function(event) {
  getTrainers().then(trainers => {
    trainers.forEach(trainer => {
      renderTrainers(trainer);
    })
  })
});

function getTrainers() {
  return fetch(TRAINERS_URL)
  .then(res => res.json());
}

function renderTrainers(trainer) {
  const p = document.createElement('p');
  p.innerText = trainer.name;

  const addBtn = document.createElement('button');
  addBtn.setAttribute('class', 'add');
  addBtn.innerText = "Add Pokemon";

  const ul = document.createElement('ul');
  trainer.pokemons.forEach(pokemon => {
    const li = document.createElement('li');
    li.innerText = `${pokemon.nickname} (${pokemon.species})`
    const releaseBtn = document.createElement('button');
    releaseBtn.setAttribute('class', 'release');
    releaseBtn.innerText = "Release";
    li.appendChild(releaseBtn);
    ul.appendChild(li);
  });

  const divCard = document.createElement('div');
  divCard.setAttribute('class', 'card');
  divCard.append(p, addBtn, ul);
  trainerCollection.append(divCard);
}
