const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;
const TRAINERS_WITH_POKEMON_URLS = {};
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

// const addButton = document.getElementById("add");
// addButton.addEventListener("click", addPokemon);

// function addPokemon() {
//   console.log("addPokemon called");
// }

// function buildTrainerUrl(json, index) {
//   return TRAINERS_URL + "/" + json["data"][index]["id"];
// }
// const getAllTrainers = fetch(TRAINERS_URL)
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(json) {
//     debugger;
//     json.data.forEach(json, index) {
//       fetch(buildTrainerUrl(json, index))}
//         .then(function(response) {
//           return response.json();
//         })
//         .then(function(json2) {
//           buildCard(json2);
//         })
//     );
//   };

const trainersWithIndex = fetch(TRAINERS_URL)
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
          console.log(json2);
        });
    });
  });

function buildCard(json2) {
  let trainerName = json2["data"]["attributes"]["name"];
  let pokemons = json2["included"];
  let pokemonArray = Array.from(pokemons);
  for (const attribute in pokemonArray) {
    console.log(`${attribute}: ${pokemonArray[attribute]}`);
  }
}

// const trainers = await trainersResponse.json();

// trainers.data.forEach(trainer => {
//     def renderTrainerCard() {

//     };
//     renderTrainerCard(trainer)
//   console.log(trainer.attributes.name);
// });
