const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const allTrainersListUrl = 'http://localhost:3000/trainers'

//NOTE: attachListeners() must be invoked inside either a $(document).ready() (jQuery) or 
// a window.onload = () => {} (vanilla JavaScript).
window.onload = () => {
    // When a user loads the page, they should see all trainers
    fetchAllTrainers();
}

// When a user loads the page, they should see all trainers, with their current team of Pokemon.
function fetchAllTrainers() {
    fetch(allTrainersListUrl)

    .then(resp => resp.json() )
    .then(json => json.forEach(trainer => renderTrainer(trainer)))
}

<body>
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
</body>

function renderTrainers() {
    const card = document.createElement("div")
    card.className = "card"
      // create id for each trainer
      card.id = trainer.id

    // CREATE ADD POKEMON BUTTON
    //<button data-trainer-id="1">Add Pokemon</button>
    addPokemonButton = document.createElement("button").data-trainer-id
    // button with a class name of "add-btn"
    addPokemonButton.className = "add-btn"
    // Sets addButton
    addButton = addPokemonButton
    // Adds the innerHTML of the likeButton to "Like"
    addButton.innerHTML = "Add Pokemon"
    // Sets img attribute "src" to toyImage
    // addPokemonButton.src = addButton
   //Add addPokeonButton Event Listener
    addPokemonButton.addEventListener("click", updateTrainerPokemons)
    // Appends child "button" to the parent "card"
    card.appendChild(addPokemonButton)



    // CREATE TRAINER ELEMENT
      // p tag with the trainer's name
    //Create  p tag 
    const p = document.createElement("p")
    //  Set trainerName (OR name)
    trainerName = trainer.name
     // Adds the innerHTML of the p to trainerName
     p.innerHTML = trainerName
     // Appends child "p" to the parent "card"
       card.appendChild(p)

    // li tag with the nickname(species)
    const li = document.createElement("li")
    // Set pokemon nickname(pokemon species)
    pokemonNickname = pokemonNickname
    pokemonSpecies = pokemonSpecies
    li.innerHTML = pokemonNickname(pokemonSpecies)
    
    // CREATE RELEASE BUTTON
    //<button data-trainer-id="1">Add Pokemon</button>
    releasePokeonButton = document.createElement("button").data-pokemon-id
    // button with a class name of "add"
    releasePokemonButton.className = "release"
    // Sets releaseButton
    releaseButton = releasePokemonButton
    // Adds the innerHTML of the releaseButton to "Release"
    releaseButton.innerHTML = "Release"
    // Sets img attribute "src" to toyImage
    // releasePokemonButton.src = releaseButton
   //Release Button Event Listener
   releasePokemonButton.addEventListener("click", updateTrainerPokemons)
    // Appends child "button" to the parent "card"
    card.appendChild(releasePokemonButton)
 
    // CARD HAS TO BE APPENDED TO THE NODE ON THE WEBPAGE
    document.getElementById("card").appendChild(card)
}

function addNewPokemon(event) {
    //  a POST request is sent to http://localhost:3000/trainers
    fetch("http://localhost:3000/trainers", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        trainer_id event.target[0].value, // Test
       })
    })
      .then(resp => resp.json())
      .then(resp => renderTrainers(resp))
  }
}  