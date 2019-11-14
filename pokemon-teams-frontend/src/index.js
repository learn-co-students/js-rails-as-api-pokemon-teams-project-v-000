const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
console.log('aaaa')
//fetch request for post for the pokemon.
//dom contentloaded and write fetch requests
//fetch post request

//delete request ...

document.addEventListener('DOMContentLoaded', function () {
loadingPokemon()
addPokemon()
releasePokemon()

});


function loadingPokemon(){
  //load the trainer and all their pokemon
  fetch(TRAINERS_URL)
  .then(resp => resp.json())
  .then(trainers => {
    console.log(trainers)
  trainers.forEach(trainer => trainerCard(trainer))
  //getting a trainer for each card
  })
}
//fetching all the trainers and their pokemon.

function trainerCard(trainer){
   var listPokemon = document.getElementById('pokemon-collection')
   //creating a collection for these pokemon
   var newElement = document.createElement('div');
   newElement.className = 'card';

   var h = document.createElement('h2')
   h.innerHTML = trainer.name

   var pokemon = document.createElement('h3')
   // console.log(trainer.pokemons)
   // console.log(trainer.pokemons[nickname])
   // pokemon.innerHTML = trainer.pokemons
   var releaseButton = document.createElement('button')
   releaseButton.setAttribute('class','data-pokemon-id')
   releaseButton.innerHTML = 'Release Pokemon'

   var newButton = document.createElement('button')
   newButton.setAttribute('class','data-trainer-id')
   newButton.innerHTML = 'Add Pokemon'

   newElement.append(h,newButton,releaseButton,pokemon)
   listPokemon.appendChild(newElement)
}

function addPokemon(){
// button = document.querySelector('Add Pokemon')
//  button.addEventListener('click', event => {addPokemon(event, element.id)})
}

function releasePokemon(){

}

//event listener when they press add pokemon.


//addpokemon, they should get a new pokemon
