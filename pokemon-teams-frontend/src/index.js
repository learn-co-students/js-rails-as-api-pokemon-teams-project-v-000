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

// const addButton = document.getElementById("add");
// addButton.addEventListener("click", addPokemon);

// function addPokemon() {
//   console.log("addPokemon called");
// }

const trainersResponse = fetch(TRAINERS_URL)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    createTrainersHash(json);
  });

function createTrainersHash(trainersResponse) {
  console.log(trainersResponse);
  debugger;
}
// const trainers = await trainersResponse.json();

// trainers.data.forEach(trainer => {
//     def renderTrainerCard() {

//     };
//     renderTrainerCard(trainer)
//   console.log(trainer.attributes.name);
// });
