const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector("main")
// document.addEventListener("DOMContentLoaded")

//NOTE: attachListeners() must be invoked inside either a $(document).ready() (jQuery) or 
// a window.onload = () => {} (vanilla JavaScript).
window.onload = () => {
    // When a user loads the page, they should see all trainers
    fetchAllTrainers();
    
}

// When a user loads the page, they should see all trainers, with their current team of Pokemon.
function fetchAllTrainers() {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => {
        json.forEach(trainer => renderTrainer(trainer))
        // json.forEach(trainer => console.log(trainer))
    
    })
}

{/* <body>
<h2>Pokemon Teams!</h2>

<div class="card" data-id="1"><p>Prince</p>
        <button data-trainer-id="1">Add Pokemon</button>
        <ul>
          <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
          <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
          <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
          <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
          <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
        </ul>
      </div>
</body> */}

// const renderTrainer = (trainer) = {

// }

function renderTrainer(trainer) {

// <div class="card" data-id="1"> 
  const div = document.createElement("div")
  // card.className = "card"
  div.setAttribute("class", "card")
  // create id for each trainer
  div.setAttribute("data-id", trainer.id)
  //console.log(trainer.id)

// <button data-trainer-id="1">Add Pokemon</button>
// CREATE ADD POKEMON BUTTON
  const button = document.createElement("button")
  button.setAttribute("data-trainer-id", trainer.id)
  // console.log(trainer.id)

  // Adds the innerHTML of the likeButton to "Like"
  button.innerHTML = "Add Pokemon"

  // Add Event Listener "click" to Add Pokemon Button
  button.addEventListener("click", () => {

  })

//  CREATE TRAINER ELEMENT
//  p tag with the trainer's name
// <p>Prince</p>
//  Create  p tag 
    const p = document.createElement("p")
    // Set trainer name
    // Adds the innerHTML of the p to trainerName
    p.innerHTML = trainer.name
    //console.log(trainer.name)

// <ul>
//  Create ul tag
    const ul = document.createElement("ul")
    // ul.setAttribute("li", trainer.pokemons[0].nickname)
    //console.log(ul)

  // Append Each Child (p, button and  ul  to div (Parent)
    div.appendChild(p)
    div.appendChild(button)
    div.appendChild(ul)

    // Append Child (div) to the main (Parent)
    main.appendChild(div)
    trainer.pokemons.forEach(pokemon => addPokemon(pokemon))
}

function addPokemon(pokemon) {
// <ul>
{/* <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li> */}
    //  querySelector for ul tags
    // Retrieve ul
    const ul = document.querySelector(`div[data-id="${pokemon.trainer_id}"]`)
    // Create li tag
    const li = document.createElement("li")
   // CREATE RELEASE BUTTON
    const button = document.createElement("button")

    // pokemon.nickname (pokemon.species) using Interpolation
    li.innerHTML = `${pokemon.nickname} (${pokemon.species})`

// <button class="release" data-pokemon-id="141">Release</button>
    // Button Set Attribute class release
    button.setAttribute("class", "release")
    // Button Set Attribute data-pokemon-id pokemon.id
    button.setAttribute("data-pokemon-id", "pokemon.id")
    // Set innerHTML of button to Release
    button.innerHTML = "Release"

  // Add Event Listener "click" to Release Pokemon Button
  button.addEventListener("click", () => {

  })

  // Append Child(button) to li (Parent)
    li.appendChild(button)
  // Append Child(li) to ul (Parent)
    ul.appendChild(li)

//Release Button Event Listener
//    releasePokemonButton.addEventListener("click", updateTrainerPokemons)
// Appends child "button" to the parent "card"
//     card.appendChild(releasePokemonButton)    

    //  a POST request is sent to http://localhost:3000/trainers
    // fetch(POKEMONS_URL, {
    //   method: "POST", 
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Accept": "application/json"
    //   },
    //   body: JSON.stringify({
    //     trainer_id: pokemon.trainer_id,
    //     // index.js:141 POST http://localhost:3000/trainers 404 (Not Found)
    //    })
    // })
    //   .then(resp => resp.json())
    //   .then(resp => addPokemon(resp))
}
