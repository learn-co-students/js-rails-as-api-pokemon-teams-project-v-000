const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

//   Use the Asynchrony to finish out this project.

const add_pokemon = document.getElementById('add_pokemons');
    add_pokemon.addEventListener('click', function (event){
        event.preventDefault()
        // fetch(TRAINERS_URL).then(function (response);
        // ))

        
    })

const getTrainers = () => {
    fetch(TRAINERS_URL)
        .then(res => res.json())
         .then(json => displayTrainers(json))
     }
     
function displayTrainers(json) {
    for (const trainer of json) {
        displayTrainer(trainer)  
      }
         
    }
 
function displayTrainer(trainer) {

    
    let element = `
         ${trainer.name};
         ${trainer.id}
    `
    console.log(trainer)
    document.getElementById('trainers_id').append(element)
}
    
    
document.addEventListener("DOMContentLoaded", function() {
   getTrainers()
  });

// fetch(BASE_URL)
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(json) {
//         console.log(json)
//     });