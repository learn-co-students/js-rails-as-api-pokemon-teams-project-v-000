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


});


function loadingPokemon(){
  //load the trainer and all their pokemon
  fetch(TRAINERS_URL)
  .then(resp => resp.json())
  .then(trainers => {
    console.log(trainers[0].name)
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

   var pokemon = document.createElement('li')
   //link id to the pokemon
   trainer.pokemons.forEach( animal => console.log(animal)
     // if (trainer.id === animal.trainer_id) {
     //   pokemon.innerHTML = animal.nickname
     )






   var releaseButton = document.createElement('button')
   releaseButton.setAttribute('class','data-pokemon-id')
   releaseButton.innerHTML = 'Release Pokemon'
   releaseButton.addEventListener('click', event => {releasePokemon(event)})

   var addButton = document.createElement('button')
   addButton.setAttribute('class','data-trainer-id')
   addButton.innerHTML = 'Add Pokemon'
   addButton.addEventListener('click',event => {addPokemon(event)})

   newElement.append(h,addButton,releaseButton,pokemon)
   listPokemon.appendChild(newElement)
}

function addPokemon(event){
fetch(POKEMONS_URL,{
  method: "POST",
  headers:
  {
    "Content-Type": "application/json",
  Accept: "application/json"
},
body:{
  'hi'
}
})
}

function releasePokemon(event){


}

//event listener when they press add pokemon.


//addpokemon, they should get a new pokemon
