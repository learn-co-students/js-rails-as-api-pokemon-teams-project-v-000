// NOTE: A graphic is available here showing how I put this Javascript together: https://i.imgur.com/EHW3YhJ.jpg

const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const HAWKS_URL = `${BASE_URL}/hawks`

console.log("Javascript is being read")

// This interacts with the database independent of any HTML
// This function will create a new pokemon
function createANewPokemon(assignThisTrainerId) {
  fetch(`http://localhost:3000/pokemons`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify({
        "trainer_id": assignThisTrainerId
      })
    })
 // This will refresh the page
 window.location.reload();  // alternative => document.location.reload(true);
}

// This interacts with the database independent of any HTML
// This function will delete a pokemon
function deleteASpecifiedPokemon(pokemonId) {
  return fetch(`http://localhost:3000/pokemons/${pokemonId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
    }),
 // This will refresh the page
 window.location.reload(); // alternative => document.location.reload(true);
}

// This will populate the cards with individual pokemons
function populatePokemonsToCards(trainerId, layoutVar4){
fetch(`http://localhost:3000/trainers/${trainerId}`)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    for (const pokemon of json.pokemons) {
    let layoutVar5 = document.createElement('li')
        layoutVar5.innerText = `${pokemon.nickname} (${pokemon.species})`
    let layoutVar6 = document.createElement('button')
        layoutVar6.setAttribute('class', "release")
        layoutVar6.setAttribute('data-pokemon-id', pokemon.id)
        layoutVar6.innerText = "Release"

        layoutVar6.addEventListener('click', event => {
          // This console.log statement is provided for debugging purposes
          console.log(`Delete Pokemon button has been pressed for ${pokemon.name}`);
          event.preventDefault();
          // This will refresh the page & prevent the console.log statement above
          // if the "deleteASpecifiedPokemon" function is working properly
          deleteASpecifiedPokemon(pokemon.id);
        })

    layoutVar4.appendChild(layoutVar5)
    layoutVar5.appendChild(layoutVar6)
    }
  });
}

// This will populate the page with individual cards that each show a trainer
// and all the pokemons assigned to them rendered with the
// "populatePokemonsToCards" function above
function createCards(){
  fetch('http://localhost:3000/trainers')
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    for (const trainer of json) {
      let layoutVar1 = document.createElement('div')
          layoutVar1.setAttribute('class', "card")
          layoutVar1.setAttribute('data-id', trainer.id)
      let layoutVar2 = document.createElement('p')
          layoutVar2.innerText = trainer.name
      let layoutVar3 = document.createElement('button')
          layoutVar3.setAttribute('data-trainer-id', trainer.id)
          layoutVar3.innerText = "Add Pokemon"

          layoutVar3.addEventListener('click', event => {
            // This console.log statement is provided for debugging purposes
            console.log(`Add Pokemon button has been pressed for ${trainer.name}`);
            event.preventDefault();
            // This will refresh the page & prevent the console.log statement above
            // if the "createANewPokemon" function is working properly
            createANewPokemon(trainer.id);
          })


      let layoutVar4 = document.createElement('ul')

      layoutVar1.appendChild(layoutVar2)
      layoutVar1.appendChild(layoutVar3)
      layoutVar1.appendChild(layoutVar4)

      populatePokemonsToCards(trainer.id, layoutVar4)

      let insertPoint = document.querySelector("main")
          insertPoint.appendChild(layoutVar1)
    }
  });
}

/////////////////////IMPORTANT FOR PORTFOLIO PROJECT////////////////////////////
// This section explores how to take inputs from forms on the DOM, and transfer
// those inputs to the Rails backend database.  This will be required on the
// portfolio project but isn't done in any of the labs that I can find


// FIRST: you have to setup a queryselector on the submit button //////////////
let newHawkFormSubmitButton = document.querySelector("form.new-hawk-form input[type='submit']")

// SECOND: you have to setup a queryselector on the form the submit button belongs to //////////////
let newHawkForm = document.querySelector('form.new-hawk-form')

// THIRD: you have to add an event listener to the user clicking on the submit button
newHawkFormSubmitButton.addEventListener('click', event => {

  // FOURTH: you have to add an event listener to the submitting of the form
  newHawkForm.addEventListener('submit', event => {
    event.preventDefault()
    createANewHawk(event.target) //target grabs the values you input on the form
  })
})


function createANewHawk(hawk_data){
  fetch('http://localhost:3000/hawks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify({
        // FIFTH: you must define the parameters you want to send to the Rails backend here:
        "java_script_name": hawk_data.name.value,
        "java_script_species": hawk_data.species.value

      })
    })
    .then(function(json) {
      console.log(json);
    });
}


createCards()
