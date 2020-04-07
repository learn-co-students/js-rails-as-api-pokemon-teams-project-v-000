const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

function createPokemon(e) {
  let addURL = "http://localhost:3000/pokemons/";
  let trainerId = e["srcElement"]["attributes"]["0"]["value"];
  let card = document.getElementById(trainerId);
  let list = card.getElementsByClassName("list");
  if (list["0"]["children"].length <= 6) {
    (async () => {
      const rawResponse = await fetch(addURL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: trainerId })
      });
      const content = await rawResponse.json();
    })();
    location.reload(); //necessary to reload local file. Would abstract away to render view if real app
  } else {
    alert(
      "Trainer limit reached. You must remove at least one Pokemon before you can add new pokemons to the team."
    );
  }
}

function releasePokemon(e) {
  let pokemonId = e["target"]["attributes"]["0"]["value"];
  let releaseURL = "http://localhost:3000/pokemons/" + pokemonId;
  fetch(releaseURL, { method: "DELETE" });
  location.reload();
}

function gatherTrainerData() {
  fetch(TRAINERS_URL)
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
}

function buildCard(json2) {
  if (json2["data"] != null) {
    //Establish card variables for trainer
    let trainerId = json2["data"]["id"];
    let trainerName = json2["data"]["attributes"]["name"];

    //Create the div
    const card = document.createElement("div");
    card.setAttribute("id", trainerId);
    card.setAttribute("data-id", trainerId);
    card.setAttribute("class", "card");
    document.getElementById("main").appendChild(card);

    //Create the <p> and append it to card body
    let p = document.createElement("p");
    p.innerText = trainerName;
    card.appendChild(p);

    //Add the button for adding a pokemon by trainer-id to the trainer's card
    let addButton = document.createElement("button");
    addButton.setAttribute("data-trainer-id", trainerId);
    addButton.setAttribute("class", "add");
    addButton.innerText = "Add Pokemon";
    addButton.addEventListener("click", createPokemon);
    card.appendChild(addButton);

    //Create a <ul> and append to card
    let ul = document.createElement("ul");
    ul.setAttribute("class", "list");
    card.appendChild(ul);

    //Create <li> for each pokemon with bespoke release button and append to trainer's <ul> of pokemon
    let pokemonsArray = json2["included"];
    pokemonsArray.forEach((pokemon, index) => {
      let pokemonNickName = pokemonsArray[index]["attributes"]["nickname"];
      let pokemonSpecies = pokemonsArray[index]["attributes"]["species"];
      let pokemonId = pokemonsArray[index]["attributes"]["id"];
      let releaseButton = document.createElement("button");
      releaseButton.setAttribute("data-pokemon-id", pokemonId);
      releaseButton.setAttribute("id", "release");
      releaseButton.setAttribute("class", "release");
      releaseButton.addEventListener("click", releasePokemon);
      releaseButton.innerText = "Release";
      let li = document.createElement("li");
      li.innerText = pokemonNickName + " (" + pokemonSpecies + ")";
      li.appendChild(releaseButton);
      ul.appendChild(li);
    });
  }
}

gatherTrainerData();
