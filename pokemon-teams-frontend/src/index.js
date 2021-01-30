const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function() {
 
  loadAllTrainers();
    
  });

 function loadAllTrainers() {
   fetch(TRAINERS_URL)
   .then(res => res.json())
   .then(results => {
      results.data.forEach(displayTrainers)
   });
 }

 function displayTrainers(value) {
  // console.log(value.attributes.name)
  value.attributes.pokemons.forEach(displayPokemons)
 }

 function displayPokemons(value){
  // console.log(value.species)
  // console.log(value.nickname)
 }
 
