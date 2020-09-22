const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

function renderData(json) {
  const main = document.getElementById("main");

  for (const element of json) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-id", element.id);
    main.appendChild(card);

    const pTag = document.createElement("p");
    pTag.innerHTML = element.name;
    card.appendChild(pTag);

    const addBtn = document.createElement("button");
    addBtn.innerHTML = "Add Pokemon";

    card.appendChild(addBtn);
    const ul = document.createElement("ul");

    fetch(`${TRAINERS_URL}/${element.id}/pokemons`)
      .then((resp) => resp.json())
      .then((pokemons) => {
        for (const pokemon of pokemons) {
          const li = document.createElement("li");
          li.innerHTML = `${pokemon.nickname}(${pokemon.species})`;

          const releaseBtn = document.createElement("button");
          releaseBtn.classList.add("release");
          releaseBtn.setAttribute("data-pokemon-id", pokemon.id);
          releaseBtn.innerHTML = "Release";
          releaseBtn.addEventListener("click", (e) => {
            deleteData(pokemon.id);
            e.target.parentNode.remove();
          });
          li.appendChild(releaseBtn);
          ul.appendChild(li);
        }
        card.appendChild(ul);
      });

    addBtn.addEventListener("click", (e) => {
      console.log(ul);
      submitData(element.id).then((pokemon) => {
        //append pokemon to UL
      }));
    });
  }
}

function fetchData(url) {
  return fetch(url)
    .then((resp) => resp.json())
    .then((json) => renderData(json));
}

function deleteData(pokemonId) {
  let url = `${POKEMONS_URL}/${pokemonId}`;
  console.log(url);
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((response) => {});
}

function submitData(trainerId) {
  trainerData = { trainerId: trainerId };

  let payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(trainerData),
  };

  return fetch("http://localhost:3000/pokemons", payload)
    .then(function (response) {
      return response.json();
    })
    .then(function (pokemon) {
      return pokemon;
    })
    .catch(function (error) {
      //what to do if error
    });
}

document.addEventListener("DOMContentLoaded", function () {
  fetchData(TRAINERS_URL);
});
