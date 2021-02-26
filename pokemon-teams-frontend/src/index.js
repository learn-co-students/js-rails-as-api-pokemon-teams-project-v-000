const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

console.log("Javascript is being read")


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

 window.location.reload();  
}

function deleteASpecifiedPokemon(pokemonId) {
  return fetch(`http://localhost:3000/pokemons/${pokemonId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
    }),

 window.location.reload();
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
            console.log(`Add Pokemon button has been pressed for ${trainer.name}`);
            event.preventDefault();
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
createCards()
