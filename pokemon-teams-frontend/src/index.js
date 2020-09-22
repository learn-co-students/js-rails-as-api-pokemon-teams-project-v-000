const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

function renderData(json) {
  const main = document.getElementById("main");

  for (const element of json) {
    const card = document.createElement("div");
    card.classList.add("card");
    main.appendChild(card);

    const pTag = document.createElement("p");
    pTag.innerHTML = element.name;
    card.appendChild(pTag);

    const addBtn = document.createElement("button");
    addBtn.innerHTML = "Add Pokemon";
    card.appendChild(addBtn);

    fetch(`${TRAINERS_URL}/${element.id}/pokemons`)
      .then((resp) => resp.json())
      .then((pokemons) => {
        const ul = document.createElement("ul");

        for (const pokemon of pokemons) {
          const li = document.createElement("li");
          li.innerHTML = `${pokemon.nickname}(${pokemon.species})`;

          const releaseBtn = document.createElement("button");
          releaseBtn.classList.add("release");
          releaseBtn.innerHTML = "Release";
          li.appendChild(releaseBtn);
          ul.appendChild(li);
        }
        card.appendChild(ul);
      });
  }
}

function fetchData(url) {
  return fetch(url)
    .then((resp) => resp.json())
    .then((json) => renderData(json));
}

document.addEventListener("DOMContentLoaded", function () {
  fetchData(TRAINERS_URL);
});
