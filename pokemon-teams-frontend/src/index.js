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



   //link id to the pokemon


    var releaseButton = document.createElement('button')
   releaseButton.setAttribute('class','data-pokemon-id')
   releaseButton.innerHTML = 'Release Pokemon'
   releaseButton.addEventListener('click', event => {releasePokemon(event)})

   var addButton = document.createElement('button')
   addButton.setAttribute('class','data-trainer-id')
   addButton.innerHTML = 'Add Pokemon'
   addButton.addEventListener('click',event => {addPokemon(event,trainer.id,'jack','dog')})
   //adding attributes to post to the fetch


   newElement.append(h,addButton,releaseButton)

   trainer.pokemons.forEach(animal => {
     var pokemon = document.createElement('li')
     pokemon.innerHTML = `${animal.nickname}(${animal.species})`
     newElement.append(pokemon)
   })
   listPokemon.appendChild(newElement)


}



function addPokemon(event,id,nickname,species){

  fetch(POKEMONS_URL,{
    method: "POST",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nickname: nickname,
      species: species,
      trainer_id: id
    })
  })
}


function releasePokemon(event){


}

//event listener when they press add pokemon.


//addpokemon, they should get a new pokemon
