const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;
// DESIRED HTML
/* <div class="card">
<p>Coach name</p>
<button>Add Pokemon</button>
<ul>
  <li>
    Pokemon Name
    <button class="release">Release</button>
  </li>
</ul>
</div> */

const addButton = document.getElementById("add");
addButton.addEventListener("click", addPokemon);

function addPokemon() {
  console.log("addPokemon called");
}

const gatherTrainerData = fetch(TRAINERS_URL)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    json.data.forEach((trainer, index) => {
      let resource = TRAINERS_URL + "/" + index;
      fetch(resource)
        .then(function(response) {
          return response.json();
        })
        .then(function(json2) {
          buildCard(json2);
        });
    });
  });

function buildCard(json2) {
  if (json2["data"] != null) {
    //Establish card variables for trainer
    let trainerId = json2["data"]["id"];
    let trainerName = json2["data"]["attributes"]["name"];

    //Create the div
    const card = document.createElement("div");
    card.setAttribute("data-id", trainerId);
    card.setAttribute("class", "card");
    document.getElementById("main").appendChild(card);

    //Create the <p> and append it to card body
    let p = document.createElement("p");
    p.innerText = trainerName;
    card.appendChild(p);

    //Add the button to add a pokemon by trainer-id
    let addButton = document.createElement("button");
    addButton.setAttribute("data-trainer-id", trainerId);
    addButton.innerText = "Add Pokemon";
    card.appendChild(addButton);

    //establish the <ul> and append to card
    let ul = document.createElement("ul");
    card.appendChild(ul);

    let pokemonsArray = json2["included"];
    pokemonsArray.forEach((pokemon, index) => {
      let pokemonNickName = pokemonsArray[index]["attributes"]["nickname"];
      let pokemonSpecies = pokemonsArray[index]["attributes"]["species"];
      let pokemonId = pokemonsArray[index]["attributes"]["id"];
      let releaseButton = document.createElement("button");
      releaseButton.setAttribute("data-pokemon-id", pokemonId);
      releaseButton.setAttribute("class", "release");
      releaseButton.innerText = "Release";
      let li = document.createElement("li");
      li.innerText = pokemonNickName + " (" + pokemonSpecies + ")";
      li.appendChild(releaseButton);
      ul.appendChild(li);
    });
  }
}
